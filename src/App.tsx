import TerminalLayout from './components/layout/TerminalLayout';
import Terminal from './components/terminal/Terminal';
import { TerminalProvider } from './context/TerminalContext';

function App() {
  return (
    <TerminalProvider>
      <TerminalLayout>
        <Terminal />
      </TerminalLayout>
    </TerminalProvider>
  )
}

export default App
