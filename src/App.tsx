import React, { useState } from 'react';
import HomeScreen from './components/screens/HomeScreen';
import GeneratorScreen from './components/screens/GeneratorScreen';
import { useGenerations } from './hooks/useGenerations';

export default function App() {
  const { generations, addGeneration, deleteGeneration, clearAll } = useGenerations();
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);

  const handleGenerate = (min: number, max: number, number: number) => {
    addGeneration({ min, max, number });
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