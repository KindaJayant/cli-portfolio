import React, { useEffect, useRef } from 'react';
import { useTerminal } from '../../context/TerminalContext';

import TypingOutput from './TypingOutput';
import ProjectCard from './ProjectCard';
import LandingHeader from './LandingHeader';
import type { TerminalOutput } from '../../utils/commands';

const OutputDisplay: React.FC = () => {
    const { history, theme } = useTerminal();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    return (
        <div className="w-full flex flex-col gap-2">
            {history.map((item, index) => {
                const isLast = index === history.length - 1;

                let content: React.ReactNode;

                // Determine content type handling
                if (typeof item.output === 'string') {
                    // Legacy string support
                    content = isLast ? (
                        <TypingOutput text={item.output} onComplete={() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' })} />
                    ) : (
                        item.output
                    );
                } else if (React.isValidElement(item.output)) {
                    // Legacy ReactNode support
                    content = item.output;
                } else {
                    // Structured TerminalOutput
                    const out = item.output as TerminalOutput;
                    if (out.type === 'text' || out.type === 'ai') {
                        content = isLast ? (
                            <TypingOutput text={out.content} onComplete={() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' })} />
                        ) : (
                            out.content
                        );
                    } else if (out.type === 'project') {
                        content = <ProjectCard project={out.project} />;
                    } else if (out.type === 'component') {
                        content = out.content;
                    } else if (out.type === 'header') {
                        content = <LandingHeader />;
                    }
                }

                // Hide prompt for 'banner' command
                if (item.command === 'banner') {
                    return (
                        <div key={item.id} className="w-full mb-4">
                            {content}
                        </div>
                    );
                }

                return (
                    <div key={item.id} className="flex flex-col">
                        <div className="flex">
                            <span className="mr-2 font-bold shrink-0 text-theme-text font-mono">
                                {item.command === 'jayant-ai' ? 'jayant-ai>' : 'visitor@jayant-portfolio:~$'}
                            </span>
                            <span className="text-theme-accent font-mono">{item.command}</span>
                        </div>
                        <div className={`pl-4 mt-1 whitespace-pre-wrap text-theme-dim ${Object.prototype.hasOwnProperty.call(item.output, 'type') && (item.output as any).type === 'project' ? 'w-full' : ''}`}>
                            {/* Apply font-mono to simple text output, let complex components decide for themselves */}
                            {(typeof item.output === 'string' || (Object.prototype.hasOwnProperty.call(item.output, 'type') && ((item.output as any).type === 'text' || (item.output as any).type === 'ai'))) ? (
                                <span className="font-mono">{content}</span>
                            ) : (
                                content
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
