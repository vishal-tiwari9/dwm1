import { Copy, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { getAlgorithmCode } from '../data/algorithmCodes';

interface CodeViewerProps {
  algorithm: string;
  onBack: () => void;
}

export default function CodeViewer({ algorithm, onBack }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);
  const { title, code } = getAlgorithmCode(algorithm);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Algorithms</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            <Copy size={18} />
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

        <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
          <div className="bg-slate-900 px-6 py-4 border-b border-slate-700">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
