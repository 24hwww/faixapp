import React from 'react';
import NumberGenerator from '../NumberGenerator';
import { X } from 'lucide-react';

interface Props {
  onGenerate: (min: number, max: number, number: number) => void;
  onClose: () => void;
}

export default function GeneratorScreen({ onGenerate, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-gray-100 z-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
        <NumberGenerator onGenerate={(min, max, number) => {
          onGenerate(min, max, number);
          onClose();
        }} />
      </div>
    </div>
  );
}