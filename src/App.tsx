import { useEffect, useState } from 'react';
import TerminalLayout from './components/layout/TerminalLayout';
import Terminal from './components/terminal/Terminal';
import { TerminalProvider } from './context/TerminalContext';
import Home from './components/home/Home';

const getViewFromHash = () => (window.location.hash === '#cli' ? 'terminal' : 'home');

function App() {
  const [view, setView] = useState<'home' | 'terminal'>(() => getViewFromHash());

  useEffect(() => {
    const syncView = () => setView(getViewFromHash());
    window.addEventListener('hashchange', syncView);
    syncView();

    return () => window.removeEventListener('hashchange', syncView);
  }, []);

  if (view === 'home') {
    return <Home />;
  }

  return (
    <TerminalProvider>
      <TerminalLayout>
        <Terminal />
        <a
          href="#home"
          className="fixed top-4 right-4 z-[60] bg-terminal-green/10 text-terminal-green text-xs px-2 py-1 rounded border border-terminal-green/30 hover:bg-terminal-green/20 backdrop-blur-sm transition-all opacity-50 hover:opacity-100"
        >
          {'<-'} Back to Home
        </a>
      </TerminalLayout>
    </TerminalProvider>
  );
}

export default App;
