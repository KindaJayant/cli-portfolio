import React from 'react';
import { useTypingEffect } from '../../utils/useTypingEffect';

interface TypingOutputProps {
    text: string;
    onComplete?: () => void;
}

const TypingOutput: React.FC<TypingOutputProps> = ({ text, onComplete }) => {
    const { displayedText } = useTypingEffect(text, 20, onComplete);

    return <span className="whitespace-pre-wrap font-mono">{displayedText}</span>;
};

export default TypingOutput;
