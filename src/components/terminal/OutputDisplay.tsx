import React, { useEffect, useRef } from 'react';
import { useTerminal } from '../../context/TerminalContext';

import TypingOutput from './TypingOutput';

const OutputDisplay: React.FC = () => {
    const { history } = useTerminal();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    return (
        <div className="w-full flex flex-col gap-2">
            {history.map((item, index) => {
                const isLast = index === history.length - 1;
                const isString = typeof item.output === 'string';

                return (
                    <div key={item.id} className="flex flex-col">
                        <div className="flex">
                            <span className="mr-2 text-terminal-green font-bold shrink-0">visitor@jayant-portfolio:~$</span>
                            <span className="text-white">{item.command}</span>
                        </div>
                        <div className="pl-4 text-terminal-green/90 mt-1 whitespace-pre-wrap">
                            {isLast && isString ? (
                                <TypingOutput text={item.output as string} onComplete={() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' })} />
                            ) : (
                                item.output
                            )}
                        </div>
                    </div>
                );
            })}
            <div ref={bottomRef} />
        </div>
    );
};

export default OutputDisplay;
