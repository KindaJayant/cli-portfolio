import { useState, useEffect, useRef } from 'react';

export const useTypingEffect = (text: string, speed: number = 20, onComplete?: () => void) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const index = useRef(0);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        setDisplayedText('');
        index.current = 0;
        setIsTyping(true);

        const typeChar = () => {
            if (index.current < text.length) {
                setDisplayedText((prev) => prev + text.charAt(index.current));
                index.current++;
                // Using timeout for variable speed if needed later, but interval is safer for consistency
                timerRef.current = setTimeout(typeChar, speed) as unknown as number;
            } else {
                setIsTyping(false);
                if (onComplete) onComplete();
            }
        };

        timerRef.current = setTimeout(typeChar, speed) as unknown as number;

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [text, speed, onComplete]);

    return { displayedText, isTyping };
};
