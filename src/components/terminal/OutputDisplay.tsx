import React, { useEffect, useRef } from 'react';
import { useTerminal } from '../../context/TerminalContext';

import TypingOutput from './TypingOutput';
import ProjectCard from './ProjectCard';
import LandingHeader from './LandingHeader';
import type { TerminalOutput } from '../../utils/commands';

const isTerminalOutput = (value: unknown): value is TerminalOutput => {
    return typeof value === 'object' && value !== null && 'type' in value;
};

const OutputDisplay: React.FC = () => {
    const { history } = useTerminal();
    const bottomRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [history]);

    return (
        <div className="w-full min-w-0 overflow-x-hidden flex flex-col gap-2">
            {history.map((item, index) => {
                const isLast = index === history.length - 1;

                let content: React.ReactNode;

                // Determine content type handling
                if (typeof item.output === 'string') {
                    // Legacy string support
                    content = isLast ? (
                        <TypingOutput text={item.output} onComplete={scrollToBottom} />
                    ) : (
                        item.output
                    );
                } else if (React.isValidElement(item.output)) {
                    // Legacy ReactNode support
                    content = item.output;
                } else {
                    // Structured TerminalOutput
                    const out = item.output;
                    if (isTerminalOutput(out) && (out.type === 'text' || out.type === 'ai')) {
                        content = isLast ? (
                            <TypingOutput text={out.content} onComplete={scrollToBottom} />
                        ) : (
                            out.content
                        );
                    } else if (isTerminalOutput(out) && out.type === 'project') {
                        content = <ProjectCard project={out.project} />;
                    } else if (isTerminalOutput(out) && out.type === 'component') {
                        content = out.content;
                    } else if (isTerminalOutput(out) && out.type === 'header') {
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
                    <div key={item.id} className="flex flex-col min-w-0">
                        <div className="flex min-w-0">
                            <span className="mr-2 font-bold shrink-0 text-theme-text font-mono">
                                {item.command === 'jayant-ai' ? 'jayant-ai>' : 'visitor@jayant-portfolio:~$'}
                            </span>
                            <span className="text-theme-accent font-mono min-w-0 break-all">{item.command}</span>
                        </div>
                        <div className={`pl-4 mt-1 whitespace-pre-wrap break-words text-theme-dim min-w-0 ${isTerminalOutput(item.output) && item.output.type === 'project' ? 'w-full' : ''}`}>
                            {/* Apply font-mono to simple text output, let complex components decide for themselves */}
                            {(typeof item.output === 'string' || (isTerminalOutput(item.output) && (item.output.type === 'text' || item.output.type === 'ai'))) ? (
                                <span className="font-mono break-words">{content}</span>
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
