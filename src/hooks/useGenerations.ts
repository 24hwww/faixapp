import { useState, useEffect } from 'react';
import { 
  getHistory, 
  addGeneration as addToStorage, 
  removeGeneration,
  clearAllGenerations 
} from '../utils/storage';
import type { NumberGeneration } from '../types';

export function useGenerations() {
  const [generations, setGenerations] = useState<NumberGeneration[]>([]);

  useEffect(() => {
    const history = getHistory();
    setGenerations(history.generations);
  }, []);

  const addGeneration = ({ min, max, number }: { min: number; max: number; number: number }) => {
    const generation: NumberGeneration = {
      number,
      min,
      max,
      timestamp: new Date().toLocaleString(),
    };
    
    addToStorage(generation);
    setGenerations(prev => [generation, ...prev]);
  };

  const deleteGeneration = (timestamp: string) => {
    removeGeneration(timestamp);
    setGenerations(prev => prev.filter(gen => gen.timestamp !== timestamp));
  };

  const clearAll = () => {
    clearAllGenerations();
    setGenerations([]);
  };

  return {
    generations,
    addGeneration,
    deleteGeneration,
    clearAll,
  };
}