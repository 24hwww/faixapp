import React from 'react';
import GenerationList from '../GenerationList';
import FloatingActionButton from '../ui/FloatingActionButton';
import { NumberGeneration } from '../../types';

interface Props {
  generations: NumberGeneration[];
  onOpenGenerator: () => void;
  onDelete: (timestamp: string) => void;
  onClearAll: () => void;
}

export default function HomeScreen({ generations, onOpenGenerator, onDelete, onClearAll }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 relative">
      <div className="max-w-md mx-auto">
        <GenerationList 
          generations={generations} 
          onDelete={onDelete}
          onClearAll={onClearAll}
        />
      </div>
      <FloatingActionButton onClick={onOpenGenerator} />
    </div>
  );
}