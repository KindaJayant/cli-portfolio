import React, { useState, useEffect, useRef } from 'react';
import { useTerminal } from '../../context/TerminalContext';
import { commands } from '../../utils/commands';
import { useCommandHistory } from '../../utils/useCommandHistory';
import { useAutocomplete } from '../../utils/useAutocomplete';

const CommandInput: React.FC = () => {
    const [input, setInput] = useState('');
    const { executeCommand, history, pushToHistory } = useTerminal();
    const inputRef = useRef<HTMLInputElement>(null);

    // Extract just the command strings for history
    const commandHistory = history.map(h => h.command).filter(c => c);
    const { navigateHistory } = useCommandHistory(commandHistory);

    // Autocomplete setup
    const { getSuggestions, getSharedPrefix } = useAutocomplete(Object.keys(commands));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        executeCommand(input);
        setInput('');
    };

    // Auto-focus the input
    useEffect(() => {
        inputRef.current?.focus();
    }, [history]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
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

    return (
        <form onSubmit={handleSubmit} className="flex w-full mt-2">
            <span className="mr-2 text-terminal-green font-bold">visitor@jayant-portfolio:~$</span>
            <div className="relative flex-grow">
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => inputRef.current?.focus()}
                    className="w-full bg-transparent border-none outline-none text-terminal-green font-mono caret-transparent relative z-[100] placeholder-terminal-green/30"
                    autoFocus
                    spellCheck="false"
                    autoComplete="off"
                    placeholder="type 'help' to get started"
                />
                {/* Custom block cursor */}
                <span
                    className="absolute top-0 pointer-events-none bg-terminal-green text-terminal-black animate-blink z-[100]"
                    style={{ left: `${input.length}ch` }}
                >
                    &nbsp;
                </span>
            </div>
        </form>
    );
};

export default CommandInput;
