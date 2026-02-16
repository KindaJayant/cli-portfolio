import React from 'react';
import { useTerminal } from '../../context/TerminalContext';

const MobileControls: React.FC = () => {
    const { executeCommand } = useTerminal();

    const quickCommands = ['whoami', 'projects', 'experience', 'contact', 'clear'];

    const handleCommand = (cmd: string) => {
        executeCommand(cmd);
    };

    return (
        <div className="md:hidden fixed bottom-4 left-0 right-0 px-4 z-50">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {quickCommands.map((cmd) => (
                    <button
                        key={cmd}
                        onClick={() => handleCommand(cmd)}
                        className="bg-terminal-green/10 border border-terminal-green/30 text-terminal-green px-3 py-2 rounded text-sm font-mono whitespace-nowrap active:bg-terminal-green/30 transition-colors"
                    >
                        {cmd}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MobileControls;
