import React from 'react';
import { Plus } from 'lucide-react';

interface Props {
  onClick: () => void;
}

export default function FloatingActionButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 rounded-full shadow-lg 
                 flex items-center justify-center text-white hover:bg-indigo-700 
                 transition-colors duration-200 focus:outline-none focus:ring-2 
                 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
}