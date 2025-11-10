import { useState } from 'react';
import AlgorithmButtons from './components/AlgorithmButtons';
import CodeViewer from './components/CodeViewer';

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {!selectedAlgorithm ? (
        <AlgorithmButtons onSelect={setSelectedAlgorithm} />
      ) : (
        <CodeViewer
          algorithm={selectedAlgorithm}
          onBack={() => setSelectedAlgorithm(null)}
        />
      )}
    </div>
  );
}

export default App;
