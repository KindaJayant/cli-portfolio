import React from 'react';
import MatrixBackground from './MatrixBackground';
import { useTerminal } from '../../context/TerminalContext';

const TerminalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { glitchModeActive } = useTerminal();

    return (
        <div className={`min-h-screen bg-terminal-black text-terminal-green font-mono relative selection:bg-terminal-green selection:text-terminal-black ${glitchModeActive ? 'animate-pulse' : ''}`}>
            <MatrixBackground />

            {/* CRT Scanline Effect */}
            <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] opacity-20 pointer-events-none" />

            {/* Glitch Overlay */}
            {glitchModeActive && (
                <div className="fixed inset-0 pointer-events-none z-[60] bg-red-500/10 animate-ping mix-blend-difference" />
            )}

            <div className="relative z-10 p-4 min-h-screen flex flex-col max-w-4xl mx-auto items-start justify-start">
                {children}
            </div>

            {/* Quick Help Box */}
            <div className="hidden md:block fixed bottom-4 right-4 z-50 border border-terminal-green/30 bg-terminal-black/80 p-4 rounded text-xs text-terminal-green font-mono backdrop-blur-sm shadow-[0_0_10px_rgba(0,255,0,0.1)]">
                <div className="font-bold mb-2 border-b border-terminal-green/30 pb-1">Quick Start</div>
                <ul className="space-y-1">
                    <li>Type <span className="font-bold">'help'</span> for commands</li>
                    <li>Type <span className="font-bold">'whoami'</span> for bio</li>
                    <li>Type <span className="font-bold">'projects'</span> for work</li>
                </ul>
            </div>
        </div>
    );
};

export default TerminalLayout;
