export interface RangeValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateRange = (min: number, max: number): RangeValidationResult => {
  if (isNaN(min) || isNaN(max)) {
    return { isValid: false, error: 'Please enter valid numbers' };
  }
  
  if (min >= max) {
    return { isValid: false, error: 'Minimum must be less than maximum' };
  }

  return { isValid: true };
};