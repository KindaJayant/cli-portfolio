import React from 'react';
import { useTerminal } from '../../context/TerminalContext';

const LightModeModal: React.FC = () => {
    const {
        showLightModeModal,
        setShowLightModeModal,
        trollStage,
        setTrollStage,
        setTheme
    } = useTerminal();

    if (!showLightModeModal) return null;

    const handleYes = () => {
        setTrollStage(2);
    };

    const handleNo = () => {
        setShowLightModeModal(false);
        setTrollStage(0);
    };

    const handleFine = () => {
        setTheme('light');
        setShowLightModeModal(false);
        setTrollStage(0);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-terminal-black border border-terminal-green p-8 max-w-md w-full shadow-[0_0_20px_rgba(0,255,0,0.3)] text-center relative">
                {/* Scanline overlay for modal */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] opacity-10" />

                {trollStage === 1 && (
                    <div className="flex flex-col gap-6 relative z-10">
                        <h2 className="text-2xl font-bold text-terminal-green animate-pulse">WARNING</h2>
                        <p className="text-white text-lg">Really?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleYes}
                                className="px-6 py-2 border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-black transition-colors font-bold uppercase"
                            >
                                Yes
                            </button>
                            <button
                                onClick={handleNo}
                                className="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors font-bold uppercase"
                            >
                                No
                            </button>
                        </div>
                    </div>
                )}

                {trollStage === 2 && (
                    <div className="flex flex-col gap-6 relative z-10">
                        <h2 className="text-2xl font-bold text-terminal-green animate-pulse">SIGH...</h2>
                        <p className="text-white text-lg">I guess people love being blinded these days.</p>
                        <div className="flex justify-center">
                            <button
                                onClick={handleFine}
                                className="px-8 py-2 border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-black transition-colors font-bold uppercase"
                            >
                                Fine.
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LightModeModal;
