import React, { useState, useEffect, useRef } from 'react';
import { useTerminal } from '../../context/TerminalContext';
import { commands } from '../../utils/commands';
import { useCommandHistory } from '../../utils/useCommandHistory';
import { useAutocomplete } from '../../utils/useAutocomplete';
import { useAiChat } from '../../utils/useAiChat';

const CommandInput: React.FC = () => {
    const [input, setInput] = useState('');
    const { executeCommand, history, pushToHistory, theme, isAiMode, setIsAiMode } = useTerminal();
    const inputRef = useRef<HTMLInputElement>(null);
    const { handleAiInput } = useAiChat();

    // Extract just the command strings for history
    const commandHistory = history.map(h => h.command).filter(c => c);
    const { navigateHistory } = useCommandHistory(commandHistory);

    // Autocomplete setup
    const { getSuggestions, getSharedPrefix } = useAutocomplete(Object.keys(commands));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isAiMode) {
            handleAiInput(input);
        } else {
            executeCommand(input);
        }

        setInput('');
    };

    // Auto-focus the input
    useEffect(() => {
        inputRef.current?.focus();
    }, [history]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (isAiMode && e.key === 'Escape') {
            e.preventDefault();
            setIsAiMode(false);
            pushToHistory('System', { type: 'text', content: 'Exited AI mode. Back to terminal commands.' });
            setInput('');
            return;
        }

        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            executeCommand('clear');
            return;
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevCmd = navigateHistory('up', input);
            setInput(prevCmd);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextCmd = navigateHistory('down', input);
            setInput(nextCmd);
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const suggestions = getSuggestions(input);

            if (suggestions.length === 1) {
                setInput(suggestions[0]);
            } else if (suggestions.length > 1) {
                const prefix = getSharedPrefix(suggestions);
                if (prefix && prefix.length > input.length) {
                    setInput(prefix);
                }

                // Show suggestions in output (non-typing)
                pushToHistory(input, (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 text-gray-400">
                        {suggestions.map(s => <span key={s}>{s}</span>)}
                    </div>
                ));
            }
        }
    };

    const promptText = isAiMode ? 'jayant-ai>' : 'visitor@jayant-portfolio:~$';

    // Theme-based class helpers
    const getPromptColor = () => {
        if (isAiMode) return 'text-purple-400';
        if (theme === 'light') return 'text-black';
        if (theme === 'cyberpunk') return 'text-cyan-400';
        if (theme === 'serika') return 'text-[#e2b714]';
        if (theme === 'nord') return 'text-[#88c0d0]';
        if (theme === 'matcha') return 'text-[#a7c080]';
        return 'text-terminal-green';
    };

    const getInputColor = () => {
        if (theme === 'light') return 'text-black placeholder-gray-500';
        if (theme === 'cyberpunk') return 'text-fuchsia-400 placeholder-fuchsia-400/30';
        if (theme === 'serika') return 'text-[#d1d0c5] placeholder-[#646669]';
        if (theme === 'nord') return 'text-[#d8dee9] placeholder-[#81a1c1]';
        if (theme === 'matcha') return 'text-[#d3c6aa] placeholder-[#7fbbb3]';
        return 'text-terminal-green placeholder-terminal-green/30';
    };

    const getCursorColor = () => {
        if (theme === 'light') return 'bg-black text-white';
        if (theme === 'cyberpunk') return 'bg-cyan-400 text-black';
        if (theme === 'serika') return 'bg-[#e2b714] text-[#323437]';
        if (theme === 'nord') return 'bg-[#88c0d0] text-[#2e3440]';
        if (theme === 'matcha') return 'bg-[#a7c080] text-[#2d353b]';
        return 'bg-terminal-green text-terminal-black';
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-full mt-2">
            <span className={`mr-2 font-bold shrink-0 font-mono ${getPromptColor()}`}>
                {promptText}
            </span>
            <div className="relative flex-grow">
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`w-full bg-transparent border-none outline-none font-mono caret-transparent relative z-[100] ${getInputColor()}`}
                    autoFocus
                    spellCheck="false"
                    autoComplete="off"
                    placeholder={isAiMode ? "Ask me anything... (Esc or 'exit' to leave)" : "type 'help' to get started"}
                />
                {/* Custom block cursor */}
                <span
                    className={`absolute top-0 pointer-events-none animate-blink z-[100] ${getCursorColor()}`}
                    style={{ left: `${input.length}ch` }}
                >
                    &nbsp;
                </span>
            </div>
        </form>
    );
};

export default CommandInput;
