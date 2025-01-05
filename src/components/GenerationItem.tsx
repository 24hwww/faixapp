import React from 'react';
import { Trash2 } from 'lucide-react';
import { NumberGeneration } from '../types';

interface Props {
  generation: NumberGeneration;
  onDelete?: (timestamp: string) => void;
}

export default function GenerationItem({ generation, onDelete }: Props) {
  return (
    <div className="p-3 bg-gray-50 rounded-md border border-gray-200 group">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-2xl font-bold text-indigo-600">{generation.number}</span>
          <div className="text-sm text-gray-600 mt-1">
            <div>Range: {generation.min} - {generation.max}</div>
            {generation.isEven && <div>Even numbers only</div>}
            {generation.step > 1 && <div>Step size: {generation.step}</div>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <time className="text-sm text-gray-500">{generation.timestamp}</time>
          {onDelete && (
            <button
              onClick={() => onDelete(generation.timestamp)}
              className="p-1 text-gray-400 hover:text-red-500 rounded-full 
                       hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}