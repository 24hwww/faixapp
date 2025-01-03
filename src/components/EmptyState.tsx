import React from 'react';
import { History } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-6">
      <div className="flex items-center gap-2 text-gray-500">
        <History className="w-5 h-5" />
        <p>No numbers generated yet</p>
      </div>
    </div>
  );
}