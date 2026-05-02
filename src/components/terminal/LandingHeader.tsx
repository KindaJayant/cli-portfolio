import React from 'react';
import { useTerminal } from '../../context/TerminalContext';
import { resume } from '../../data/resume';

const QUICK_COMMANDS = [
    { cmd: 'about', label: 'About' },
    { cmd: 'projects', label: 'Projects' },
    { cmd: 'project analyst-project', label: 'ResearchAgent' },
    { cmd: 'experience', label: 'Experience' },
    { cmd: 'skills', label: 'Skills' },
    { cmd: 'help', label: 'All Commands' },
];

const LandingHeader: React.FC = () => {
    const { theme, executeCommand } = useTerminal();

    // Theme-based colors
    const textColor = theme === 'cyberpunk' ? 'text-cyan-400' : 'text-terminal-green';
    const accentColor = theme === 'cyberpunk' ? 'text-fuchsia-500' : 'text-white';
    const borderColor = theme === 'cyberpunk' ? 'border-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.5)]' : 'border-terminal-green shadow-[0_0_15px_rgba(74,222,128,0.3)]';
    const stats = ['5,000+ equities scored', '6,000+ users supported', 'Agent systems', 'LLMOps tooling'];

    return (
        <div className="flex flex-col gap-6 mb-8 fade-in w-full">
            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Profile Image */}
                <div className="shrink-0 relative group">
                    <div className={`w-32 h-32 rounded-full overflow-hidden border-4 ${borderColor} transition-all duration-300 group-hover:scale-105`}>
                        <img
                            src="https://ui-avatars.com/api/?name=Jayant+Singh&background=0D8ABC&color=fff&size=256"
                            alt="Jayant Singh"
                            className="w-full h-full object-cover opacity-90 hover:opacity-100"
                        />
                    </div>
                </div>

                {/* Header & Bio */}
                <div className="flex flex-col items-center md:items-start w-full">
                    <div className={`mb-4 w-full text-center font-mono text-[2.6rem] font-bold leading-none tracking-[-0.06em] md:text-left md:text-[3.1rem] ${textColor}`}>
                        Jayant
                    </div>

                    <div className={`${accentColor} text-center md:text-left max-w-2xl`}>
                        <div className="text-xl font-bold mb-2">Hello, I'm {resume.basics.name}</div>
                        <div className="text-gray-400 text-sm md:text-base leading-relaxed">
                            I build reliable agent workflows, LLMOps tooling, and production AI systems.
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {stats.map((stat) => (
                                <span key={stat} className="px-2.5 py-1 text-xs border border-theme-text/30 text-theme-text bg-theme-text/5 rounded-sm">
                                    {stat}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Menu */}
            <div className="flex flex-col gap-3 mt-4">
                <div className="text-sm uppercase tracking-wider font-bold text-theme-text opacity-80">
                    Quick commands:
                </div>
                <div className="flex flex-wrap gap-3">
                    {QUICK_COMMANDS.map(({ cmd, label }) => (
                        <button
                            key={cmd}
                            onClick={() => executeCommand(cmd)}
                            className="px-3 py-1.5 border border-dashed border-theme-text/50 hover:bg-theme-text/10 text-theme-text text-sm transition-colors text-left hover:border-solid"
                        >
                            <span className="opacity-50 mr-2">$</span>
                            <span className="font-bold">{label}</span>
                            <span className="opacity-40 ml-2 text-xs">({cmd})</span>
                        </button>
                    ))}
                </div>
            </div>
        </div >
    );
};
export default LandingHeader;
