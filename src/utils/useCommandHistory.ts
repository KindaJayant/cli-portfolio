import { useState, useEffect } from 'react';

export const useCommandHistory = (history: string[]) => {
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [tempInput, setTempInput] = useState('');

    // Reset index when history changes (new command added)
    useEffect(() => {
        setHistoryIndex(-1);
        setTempInput('');
    }, [history.length]);

    const navigateHistory = (direction: 'up' | 'down', currentInput: string) => {
        if (history.length === 0) return currentInput;

        let newIndex = historyIndex;

        if (direction === 'up') {
            if (historyIndex === -1) {
                // Save current input before moving up
                setTempInput(currentInput);
                newIndex = history.length - 1;
            } else {
                newIndex = Math.max(0, historyIndex - 1);
            }
        } else if (direction === 'down') {
            if (historyIndex === -1) return currentInput; // Already at bottom

            newIndex = historyIndex + 1;
        }

        setHistoryIndex(newIndex);

        if (newIndex >= history.length) {
            // Reached bottom, restore temp input
            setHistoryIndex(-1);
            return tempInput;
        }

        return history[newIndex] || '';
    };

    return { historyIndex, navigateHistory };
};
