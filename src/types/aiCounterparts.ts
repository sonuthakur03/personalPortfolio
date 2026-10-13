// src/types/aiCounterparts.ts

export interface AICounterpart {
  readonly id: string;
  readonly traditionalConcept: string;
  readonly aiCounterpart: string;
  readonly description: string;
  readonly traditionalExample: string;
  readonly aiExample: string;
  readonly loopImplementation: string;
}
