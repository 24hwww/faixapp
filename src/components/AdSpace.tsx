import React from 'react';
import GoogleAd from './GoogleAd';
import { useAdConfig } from '../hooks/useAdConfig';

interface Props {
  className?: string;
}

export default function AdSpace({ className = '' }: Props) {
  const { isEnabled, client, slot } = useAdConfig();

  if (!isEnabled) {
    return (
      <div className={`bg-gray-100 p-4 rounded-md text-center text-gray-500 text-sm ${className}`}>
        Ad Space
      </div>
    );
  }

  return (
    <div className={`min-h-[100px] ${className}`}>
      <GoogleAd client={client} slot={slot} />
    </div>
  );
}