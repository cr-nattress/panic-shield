import { useState } from 'react';

const GROUNDING_STEPS = 5;

export function useGroundingExercise() {
  const [groundingStep, setGroundingStep] = useState(0);
  const [groundingInputs, setGroundingInputs] = useState<string[][]>(
    Array(GROUNDING_STEPS).fill([]).map(() => [])
  );

  const handleGroundingInput = (stepIndex: number, inputIndex: number, value: string) => {
    // Special case for advancing to next step
    if (inputIndex === -1) {
      setGroundingStep(stepIndex);
      return;
    }

    const newInputs = [...groundingInputs];
    if (!newInputs[stepIndex]) {
      newInputs[stepIndex] = [];
    }
    newInputs[stepIndex][inputIndex] = value;
    setGroundingInputs(newInputs);

    // Check if all inputs for this step are filled
    const expectedCount = [5, 4, 3, 2, 1][stepIndex];
    const filledCount = newInputs[stepIndex].filter(Boolean).length;

    if (filledCount === expectedCount && stepIndex < GROUNDING_STEPS - 1) {
      setTimeout(() => setGroundingStep(stepIndex + 1), 500);
    }
  };

  const skipToNextStep = () => {
    if (groundingStep < GROUNDING_STEPS - 1) {
      setGroundingStep(groundingStep + 1);
    }
  };

  const reset = () => {
    setGroundingStep(0);
    setGroundingInputs(Array(GROUNDING_STEPS).fill([]).map(() => []));
  };

  return {
    groundingStep,
    groundingInputs,
    handleGroundingInput,
    skipToNextStep,
    reset
  };
}