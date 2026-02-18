import React, { useState } from 'react';
import TerminalLayout from './components/layout/TerminalLayout';
import Terminal from './components/terminal/Terminal';
import { TerminalProvider } from './context/TerminalContext';
import Home from './components/home/Home';

function App() {
  // Default to 'home' view
  const [view, setView] = useState<'home' | 'terminal'>('home');

  if (view === 'home') {
    return <Home onSwitchToTerminal={() => setView('terminal')} />;
  }

  return (
    <TerminalProvider>
      <TerminalLayout>
        <Terminal />
        {/* Back to Home Button (Optional, for now can rely on refresh or add a command) */}
        <button
          onClick={() => setView('home')}
          className="fixed top-4 right-4 z-[60] bg-terminal-green/10 text-terminal-green text-xs px-2 py-1 rounded border border-terminal-green/30 hover:bg-terminal-green/20 backdrop-blur-sm transition-all opacity-50 hover:opacity-100"
        >
          ← Back to Home
        </button>
      </TerminalLayout>
    </TerminalProvider>
  );
}

export default App;
