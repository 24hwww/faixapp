const LAST_RANGE_KEY = 'number-generator-last-range';

export interface Range {
  min: number;
  max: number;
}

export const getLastRange = (): Range => {
  const stored = localStorage.getItem(LAST_RANGE_KEY);
  return stored ? JSON.parse(stored) : { min: 1, max: 100 };
};

export const saveLastRange = (range: Range): void => {
  localStorage.setItem(LAST_RANGE_KEY, JSON.stringify(range));
};