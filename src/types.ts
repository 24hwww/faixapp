export interface NumberGeneration {
  number: number;
  min: number;
  max: number;
  timestamp: string;
  isEven?: boolean;
  step?: number;
}

export interface GenerationHistory {
  generations: NumberGeneration[];
}

export interface GeneratorOptions {
  isEven: boolean;
  step: number;
}