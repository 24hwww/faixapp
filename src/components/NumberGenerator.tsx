import React, { useState, useEffect } from 'react';
import { Dice6, AlertCircle } from 'lucide-react';
import { validateRange } from '../utils/rangeValidation';
import { getLastRange, saveLastRange } from '../utils/rangeStorage';
import type { GeneratorOptions } from '../types';

interface Props {
  onGenerate: (min: number, max: number, number: number, options: GeneratorOptions) => void;
}

export default function NumberGenerator({ onGenerate }: Props) {
  const [min, setMin] = useState<string>('1');
  const [max, setMax] = useState<string>('100');
  const [isEven, setIsEven] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const lastRange = getLastRange();
    setMin(String(lastRange.min));
    setMax(String(lastRange.max));
  }, []);

  const handleGenerate = () => {
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    
    const validation = validateRange(minNum, maxNum);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }
    
    setError(undefined);
    saveLastRange({ min: minNum, max: maxNum });

    let number;
    if (step > 1) {
      // Generate number with step
      const possibleNumbers = [];
      for (let i = minNum; i <= maxNum; i += step) {
        if (!isEven || i % 2 === 0) {
          possibleNumbers.push(i);
        }
      }
      const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
      number = possibleNumbers[randomIndex];
    } else {
      // Generate regular number
      let attempts = 0;
      do {
        number = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        attempts++;
      } while (isEven && number % 2 !== 0 && attempts < 100);
    }

    onGenerate(minNum, maxNum, number, { isEven, step });
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
                const value = e.target.value;
                setMin(value === '0' ? '0' : value.replace(/^0+/, '') || '');
                setError(undefined);
              }}
              min="0"
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
                const value = e.target.value;
                setMax(value === '0' ? '0' : value.replace(/^0+/, '') || '');
                setError(undefined);
              }}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="evenOnly"
              checked={isEven}
              onChange={(e) => setIsEven(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label htmlFor="evenOnly" className="text-sm text-gray-700">
              Generate even numbers only
            </label>
          </div>

          <div>
            <label htmlFor="step" className="block text-sm font-medium text-gray-700 mb-1">
              Step Size
            </label>
            <select
              id="step"
              value={step}
              onChange={(e) => setStep(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={1}>No step (1 by 1)</option>
              <option value={5}>5 by 5</option>
            </select>
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