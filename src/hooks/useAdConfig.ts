import { useMemo } from 'react';
import { getAdConfig } from '../utils/adConfig';

export function useAdConfig() {
  const config = useMemo(() => getAdConfig(), []);
  return config;
}