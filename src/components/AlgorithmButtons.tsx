interface AlgorithmButtonsProps {
  onSelect: (algorithm: string) => void;
}

const algorithms = [
  { id: 'naive-bayes', label: 'Naive Bayes (4th Exp)', color: 'from-blue-500 to-blue-600' },
  { id: 'decision-tree', label: 'Decision Tree (5th Exp)', color: 'from-blue-500 to-blue-600' },
  { id: 'k-means', label: 'K-Means (7th Exp)', color: 'from-blue-500 to-blue-600' },
  { id: 'fp-growth', label: 'FP-Growth (8th Exp)', color: 'from-blue-500 to-blue-600' },
  { id: 'apriori', label: 'Apriori (9th Exp)', color: 'from-blue-500 to-blue-600' },
];

export default function AlgorithmButtons({ onSelect }: AlgorithmButtonsProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Data Mining Algorithms
        </h1>
        <div className="flex flex-wrap justify-center gap-6">
          {algorithms.map((algo) => (
            <button
              key={algo.id}
              onClick={() => onSelect(algo.id)}
              className={`
                px-8 py-4 rounded-xl font-semibold text-white text-lg
                bg-gradient-to-r ${algo.color}
                hover:scale-105 hover:shadow-2xl
                transition-all duration-200
                min-w-[240px]
              `}
            >
              {algo.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
