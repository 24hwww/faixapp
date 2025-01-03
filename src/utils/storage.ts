import { GenerationHistory, NumberGeneration } from '../types';

const STORAGE_KEY = 'number-generator-history';

export const getHistory = (): GenerationHistory => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : { generations: [] };
};

export const addGeneration = (generation: NumberGeneration) => {
  const history = getHistory();
  history.generations.unshift(generation);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const removeGeneration = (timestamp: string) => {
  const history = getHistory();
  history.generations = history.generations.filter(gen => gen.timestamp !== timestamp);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const clearAllGenerations = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ generations: [] }));
};