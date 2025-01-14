import React from 'react';
import { History } from 'lucide-react';
import { NumberGeneration } from '../types';
import GenerationListHeader from './GenerationListHeader';
import GenerationItem from './GenerationItem';
import EmptyState from './EmptyState';
import AdSpace from './AdSpace';

interface Props {
  generations: NumberGeneration[];
  onDelete?: (timestamp: string) => void;
  onClearAll?: () => void;
}

export default function GenerationList({ generations, onDelete, onClearAll }: Props) {
  if (generations.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-6">
      <GenerationListHeader onClearAll={onClearAll} />
      <AdSpace className="my-4" />
      <div className="space-y-3">
        {generations.map((gen) => (
          <GenerationItem 
            key={gen.timestamp}
            generation={gen}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}