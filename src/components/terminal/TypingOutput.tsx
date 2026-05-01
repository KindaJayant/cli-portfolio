import React, { useEffect } from 'react';

interface TypingOutputProps {
    text: string;
    onComplete?: () => void;
}

const TypingOutput: React.FC<TypingOutputProps> = ({ text, onComplete }) => {
    useEffect(() => {
        onComplete?.();
    }, [onComplete]);

    return <span className="whitespace-pre-wrap break-words font-mono">{text}</span>;
};

export default TypingOutput;
