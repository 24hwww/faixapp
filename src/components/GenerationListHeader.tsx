import React from 'react';
import { History, Trash2 } from 'lucide-react';

interface Props {
  onClearAll?: () => void;
}

export default function GenerationListHeader({ onClearAll }: Props) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <History className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-800">Generation History</h2>
      </div>
      {onClearAll && (
        <button
          onClick={onClearAll}
          className="flex items-center gap-1 px-2 py-1 text-sm text-red-600 hover:bg-red-50 
                   rounded-md transition-colors"
          title="Clear All"
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </button>
      )}
    </div>
  );
}