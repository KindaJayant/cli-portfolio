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
    clearHistory: () => void;
    executeCommand: (commandStr: string) => void;
    bootCompleted: boolean;
    setBootCompleted: (completed: boolean) => void;
    matrixBoostActive: boolean;
    setMatrixBoost: (active: boolean) => void;
    glitchModeActive: boolean;
    setGlitchMode: (active: boolean) => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const TerminalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [bootCompleted, setBootCompleted] = useState(false);
    const [matrixBoostActive, setMatrixBoost] = useState(false);
    const [glitchModeActive, setGlitchMode] = useState(false);

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
            };

            const output = cmd.execute(args, actions);

            if (output !== 'CLEAR_SIGNAL') {
                pushToHistory(trimmed, output);
            }
        } else {
            pushToHistory(trimmed, `Command not found: ${cmdName}. Type 'help' for available commands.`);
        }
    }, [clearHistory, pushToHistory]);

    return (
        <TerminalContext.Provider
            value={{
                history,
                pushToHistory,
                clearHistory,
                executeCommand,
                bootCompleted,
                setBootCompleted,
                matrixBoostActive,
                setMatrixBoost,
                glitchModeActive,
                setGlitchMode
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
