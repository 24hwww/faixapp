import React, { useState, useEffect } from 'react';
import { Dice6, AlertCircle } from 'lucide-react';
import { validateRange } from '../utils/rangeValidation';
import { getLastRange, saveLastRange } from '../utils/rangeStorage';

interface Props {
  onGenerate: (min: number, max: number, number: number) => void;
}

export default function NumberGenerator({ onGenerate }: Props) {
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const lastRange = getLastRange();
    setMin(lastRange.min);
    setMax(lastRange.max);
  }, []);

  const handleGenerate = () => {
    const validation = validateRange(min, max);
    
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }
    
    setError(undefined);
    saveLastRange({ min, max });
    
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    onGenerate(min, max, number);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <div className="flex items-center gap-2 mb-6">
        <Dice6 className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-bold text-gray-800">Random Number Generator</h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="min" className="block text-sm font-medium text-gray-700 mb-1">
              Minimum
            </label>
            <input
              type="number"
              id="min"
              value={min}
              onChange={(e) => {
                setMin(Number(e.target.value));
                setError(undefined);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="max" className="block text-sm font-medium text-gray-700 mb-1">
              Maximum
            </label>
            <input
              type="number"
              id="max"
              value={max}
              onChange={(e) => {
                setMax(Number(e.target.value));
                setError(undefined);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        <button
          onClick={handleGenerate}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Dice6 className="w-5 h-5" />
          Generate Number
        </button>
      </div>
    </div>
  );
}