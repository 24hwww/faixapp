import React, { useState } from 'react';
import HomeScreen from './components/screens/HomeScreen';
import GeneratorScreen from './components/screens/GeneratorScreen';
import { useGenerations } from './hooks/useGenerations';
import type { GeneratorOptions } from './types';

export default function App() {
  const { generations, addGeneration, deleteGeneration, clearAll } = useGenerations();
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);

  const handleGenerate = (min: number, max: number, number: number, options: GeneratorOptions) => {
    addGeneration({ min, max, number, ...options });
    setIsGeneratorOpen(false);
  };

  return (
    <>
      <HomeScreen 
        generations={generations}
        onOpenGenerator={() => setIsGeneratorOpen(true)}
        onDelete={deleteGeneration}
        onClearAll={clearAll}
      />
      {isGeneratorOpen && (
        <GeneratorScreen
          onGenerate={handleGenerate}
          onClose={() => setIsGeneratorOpen(false)}
        />
      )}
    </>
  );
}