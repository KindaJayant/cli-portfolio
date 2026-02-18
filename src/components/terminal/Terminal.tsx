import React, { useEffect, useRef, useState } from 'react';
import OutputDisplay from './OutputDisplay';
import CommandInput from './CommandInput';
import MobileControls from './MobileControls';
import { useTerminal } from '../../context/TerminalContext';
import TypingOutput from './TypingOutput';
import LightModeModal from './LightModeModal';

const BOOT_SEQUENCE = [
    "Initializing Jayant Terminal v2.0...",
    "Loading AI modules...",
    "Verifying security protocols...",
    "Authenticating user...",
    "Access granted."
];

const Terminal: React.FC = () => {
    const {
        bootCompleted,
        setBootCompleted,
        executeCommand,
        theme, // Get theme from context
    } = useTerminal();

    // Local state for boot animation
    const [currentLine, setCurrentLine] = useState(0);
    const [showBoot, setShowBoot] = useState(!bootCompleted);
    const bootTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleContainerClick = () => {
        const input = document.querySelector('input');
        input?.focus();
    };

    // Boot sequence effect
    useEffect(() => {
        if (bootCompleted) {
            setShowBoot(false);
            return;
        }

        const handleKeyDown = () => {
            // Skip boot on any key
            setBootCompleted(true);
            setShowBoot(false);
            executeCommand('banner'); // Ensure banner runs
            if (bootTimeoutRef.current) clearTimeout(bootTimeoutRef.current);
        };

        window.addEventListener('keydown', handleKeyDown);

        if (currentLine >= BOOT_SEQUENCE.length) {
            bootTimeoutRef.current = setTimeout(() => {
                setBootCompleted(true);
                setShowBoot(false);
                // Run banner after boot
                executeCommand('banner');
            }, 800);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (bootTimeoutRef.current) clearTimeout(bootTimeoutRef.current);
        };
    }, [currentLine, bootCompleted, setBootCompleted, executeCommand]);

    const handleLineComplete = () => {
        setCurrentLine(prev => prev + 1);
    };

    if (showBoot) {
        return (
            <div
                className="w-full h-full flex flex-col font-mono text-terminal-green p-4"
                onClick={() => {
                    setBootCompleted(true);
                    setShowBoot(false);
                    executeCommand('banner'); // Ensure banner runs
                }}
            >
                {BOOT_SEQUENCE.slice(0, currentLine + 1).map((line, index) => (
                    <div key={index} className="mb-2">
                        {index === currentLine ? (
                            <TypingOutput
                                text={line}
                                onComplete={handleLineComplete}
                            />
                        ) : (
                            <span>{line}</span>
                        )}
                    </div>
                ))}
                <div className="mt-4 text-terminal-green/50 animate-pulse">
                    Press any key to skip...
                </div>
            </div>
        );
    }

    return (
        <div
            className={`w-full h-full pb-32 md:pb-0 theme-${theme}`} // Apply theme class
            onClick={handleContainerClick}
        >
            <OutputDisplay />
            <CommandInput />
            <MobileControls />
            <LightModeModal />
        </div>
    );
};

export default Terminal;
