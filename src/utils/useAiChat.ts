import { useRef, useEffect } from 'react';
import { useTerminal } from '../context/TerminalContext';

export const useAiChat = () => {
    const { pushToHistory, updateLastHistoryItem, setIsAiMode } = useTerminal();

    // Refs for safe async handling
    const abortRef = useRef<AbortController | null>(null);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
            // Abort any pending request on unmount
            if (abortRef.current) {
                abortRef.current.abort();
            }
        };
    }, []);

    const handleAiInput = async (input: string) => {
        const trimmed = input.trim();

        // 1. Push user input to history
        pushToHistory(input, ''); // Command is 'input', output blank for now (or handled by Terminal display logic?) 
        // Actually Terminal normally displays command line separately. 
        // In this architecture, pushToHistory(command, output) displays:
        // Prompt + command
        // Output
        // So here we are pushing the User's question as the "Command" text in history? 
        // Wait, standard executeCommand does: pushToHistory(trimmed, output)
        // BUT the Prompt is rendered by the Input component usually.
        // Let's look at `TerminalContext.tsx`: pushToHistory adds { command: input, output: output }
        // OutputDisplay renders: 
        // Line 1: prompt + item.command
        // Line 2: item.output

        // So yes, we push the question as 'command'.

        if (!trimmed) return;

        // 2. Handle Exit
        if (trimmed.toLowerCase() === 'exit') {
            setIsAiMode(false);
            pushToHistory('System', { type: 'text', content: 'Exiting AI mode.' });
            return;
        }

        // 3. Cancel previous request if active
        if (abortRef.current) {
            abortRef.current.abort();
        }

        // 4. Setup new request
        const controller = new AbortController();
        abortRef.current = controller;

        // 5. Create initial empty AI response entry
        // We push a new history item for the AI response. 
        // The command for THIS entry should probably be 'jayant-ai' to match the prompt style?
        // In the mock it was: pushToHistory('jayant-ai', { type: 'ai', content: response });
        pushToHistory('jayant-ai', { type: 'ai', content: '' });

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: trimmed }),
                signal: controller.signal,
            });

            if (response.status === 404) {
                // Determine if we are likely in dev mode without API
                // Fallback to mock for local dev experience
                updateLastHistoryItem("Connect to Vercel to see real AI! (Mocking response...) \n\n");

                // Simulate Mock Delay
                setTimeout(() => {
                    const mock = getMockResponse(trimmed);
                    updateLastHistoryItem(mock);
                }, 500);
                return;
            }

            if (!response.ok || !response.body) {
                throw new Error(response.statusText || 'Network error');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedResponse = '';

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                // Memory safety check
                if (!mountedRef.current) break;

                const chunk = decoder.decode(value, { stream: true });
                accumulatedResponse += chunk;

                // Update the UI with new chunk
                updateLastHistoryItem(accumulatedResponse);
            }

        } catch (error: any) {
            if (error.name === 'AbortError') {
                // Ignore aborts
                return;
            }

            if (mountedRef.current) {
                // Update with error message
                updateLastHistoryItem(`Error: ${error.message || 'Failed to fetch response.'}`);
            }
        } finally {
            if (abortRef.current === controller) {
                abortRef.current = null;
            }
        }
    };

    return { handleAiInput };
};

const getMockResponse = (input: string): string => {
    const lower = input.toLowerCase();

    if (lower.includes('skill') || lower.includes('stack')) {
        return "I specialize in the React ecosystem, TypeScript, and Node.js. My architecture focuses on clean patterns and performance optimization.";
    }
    if (lower.includes('experience') || lower.includes('work')) {
        return "I've worked on scalable web systems, including a Mini ERP and various AI-driven tools. I love solving complex state management problems.";
    }
    if (lower.includes('contact') || lower.includes('email')) {
        return "You can reach me via the 'contact' command in the main terminal. I'm always open to interesting opportunities.";
    }
    if (lower.includes('hello') || lower.includes('hi')) {
        return "Hello there! I'm Jayant's digital assistant. Ask me about his projects, skills, or work methodology.";
    }
    if (lower.includes('joke')) {
        return "Why do React developers hate hanging out? Because they are always breaking up... into components.";
    }

    return "That's an interesting question. While I'm a simple mock AI for this portfolio demos, Jayant would be happy to discuss it in detail. You can ask me about his 'skills' or 'projects'.";
};
