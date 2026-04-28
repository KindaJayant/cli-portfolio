import React, { createContext, useContext, useState, useCallback } from 'react';
import { commands, type CommandOutput } from '../utils/commands';

interface HistoryItem {
    id: string;
    command: string;
    output: CommandOutput;
}

interface TerminalContextType {
    history: HistoryItem[];
    pushToHistory: (command: string, output: CommandOutput) => void;
    updateLastHistoryItem: (content: string) => void;
    clearHistory: () => void;
    executeCommand: (commandStr: string) => void;
    bootCompleted: boolean;
    setBootCompleted: (completed: boolean) => void;
    matrixBoostActive: boolean;
    setMatrixBoost: (active: boolean) => void;
    glitchModeActive: boolean;
    setGlitchMode: (active: boolean) => void;

    theme: 'dark' | 'light' | 'cyberpunk';
    setTheme: (theme: 'dark' | 'light' | 'cyberpunk') => void;
    showLightModeModal: boolean;
    setShowLightModeModal: (show: boolean) => void;
    trollStage: 0 | 1 | 2;
    setTrollStage: (stage: 0 | 1 | 2) => void;

    isAiMode: boolean;
    setIsAiMode: (active: boolean) => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

const getClosestCommands = (input: string, options: string[]) => {
    const normalizedInput = input.toLowerCase();

    const levenshtein = (a: string, b: string) => {
        const dp = Array.from({ length: a.length + 1 }, () => Array<number>(b.length + 1).fill(0));

        for (let i = 0; i <= a.length; i++) dp[i][0] = i;
        for (let j = 0; j <= b.length; j++) dp[0][j] = j;

        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,
                    dp[i][j - 1] + 1,
                    dp[i - 1][j - 1] + cost
                );
            }
        }

        return dp[a.length][b.length];
    };

    return options
        .map((option) => ({
            option,
            score: option.startsWith(normalizedInput) ? 0 : levenshtein(normalizedInput, option),
        }))
        .sort((left, right) => left.score - right.score)
        .filter(({ score, option }) => score <= 3 || option.includes(normalizedInput))
        .slice(0, 3)
        .map(({ option }) => option);
};

export const TerminalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [bootCompleted, setBootCompleted] = useState(false);
    const [matrixBoostActive, setMatrixBoost] = useState(false);
    const [glitchModeActive, setGlitchMode] = useState(false);

    // Theme & Troll Mode State
    const [theme, setTheme] = useState<'dark' | 'light' | 'cyberpunk'>('dark');
    const [showLightModeModal, setShowLightModeModal] = useState(false);
    const [trollStage, setTrollStage] = useState<0 | 1 | 2>(0);
    const [isAiMode, setIsAiMode] = useState(false); // Prep for Phase 4

    const pushToHistory = useCallback((command: string, output: CommandOutput) => {
        setHistory((prev) => [
            ...prev,
            {
                id: Math.random().toString(36).substr(2, 9),
                command,
                output,
            },
        ]);
    }, []);

    const updateLastHistoryItem = useCallback((content: string) => {
        setHistory((prev) => {
            if (prev.length === 0) return prev;
            const last = prev[prev.length - 1];
            // Only update if it's an AI response we are streaming
            // We assume the last item is the one we want to stream into
            // and it has an object structure with type 'ai'
            if (typeof last.output === 'object' && last.output !== null && 'type' in last.output && (last.output as any).type === 'ai') {
                return [
                    ...prev.slice(0, -1),
                    {
                        ...last,
                        output: {
                            ...last.output,
                            content: content
                        }
                    }
                ];
            }
            return prev;
        });
    }, []);

    const clearHistory = useCallback(() => {
        setHistory([]);
    }, []);

    const executeCommand = useCallback((commandStr: string) => {
        const trimmed = commandStr.trim();
        if (!trimmed) {
            pushToHistory('', '');
            return;
        }

        const [cmdName, ...args] = trimmed.split(/\s+/);
        const cmd = commands[cmdName.toLowerCase()];

        if (cmd) {
            const actions = {
                clear: clearHistory,
                setMatrixBoost,
                setGlitchMode,
                triggerThemeTroll: () => {
                    setTrollStage(1);
                    setShowLightModeModal(true);
                },
                setTheme,
                setIsAiMode
            };

            const output = cmd.execute(args, actions);

            if (output !== 'CLEAR_SIGNAL') {
                pushToHistory(trimmed, output);
            } else {
                clearHistory();
            }
        } else {
            const suggestions = getClosestCommands(cmdName.toLowerCase(), Object.keys(commands).filter((key) => !commands[key].hidden));
            const suggestionText = suggestions.length > 0
                ? ` Did you mean: ${suggestions.map((suggestion) => `'${suggestion}'`).join(', ')}?`
                : " Type 'help' for available commands.";
            pushToHistory(trimmed, `Command not found: ${cmdName}.${suggestionText}`);
        }
    }, [clearHistory, pushToHistory]);

    return (
        <TerminalContext.Provider
            value={{
                history,
                pushToHistory,
                updateLastHistoryItem,
                clearHistory,
                executeCommand,
                bootCompleted,
                setBootCompleted,
                matrixBoostActive,
                setMatrixBoost,
                glitchModeActive,
                setGlitchMode,
                theme,
                setTheme,
                showLightModeModal,
                setShowLightModeModal,
                trollStage,
                setTrollStage,
                isAiMode,
                setIsAiMode
            }}
        >
            {children}
        </TerminalContext.Provider>
    );
};

export const useTerminal = () => {
    const context = useContext(TerminalContext);
    if (!context) {
        throw new Error('useTerminal must be used within a TerminalProvider');
    }
    return context;
};
