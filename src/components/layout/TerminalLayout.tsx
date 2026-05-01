import React from 'react';
import MatrixBackground from './MatrixBackground';
import { useTerminal } from '../../context/TerminalContext';

const TerminalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { glitchModeActive, theme } = useTerminal();

    // Theme Classes Map
    const themeClasses = {
        dark: 'bg-terminal-black text-terminal-green selection:bg-terminal-green selection:text-terminal-black',
        light: 'bg-white text-black selection:bg-black selection:text-white',
        cyberpunk: 'bg-gray-900 text-fuchsia-400 selection:bg-fuchsia-400 selection:text-black',
        serika: 'bg-[#323437] text-[#d1d0c5] selection:bg-[#e2b714] selection:text-[#323437]',
        nord: 'bg-[#2e3440] text-[#d8dee9] selection:bg-[#88c0d0] selection:text-[#2e3440]',
        matcha: 'bg-[#2d353b] text-[#d3c6aa] selection:bg-[#a7c080] selection:text-[#2d353b]',
    };

    return (
        <div className={`min-h-screen font-mono relative transition-colors duration-500
            ${themeClasses[theme]}
            ${glitchModeActive ? 'animate-pulse' : ''}
        `}>
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
        </div>
    );
};

export default TerminalLayout;
