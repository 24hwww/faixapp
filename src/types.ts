export interface NumberGeneration {
  number: number;
  min: number;
  max: number;
  timestamp: string;
}

export interface GenerationHistory {
  generations: NumberGeneration[];
}