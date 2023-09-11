import { Injectable } from '@angular/core';

export interface Step {
  key: string;
  label: string;
}

export interface ActiveStep {
  index: number;
}

@Injectable()
export class StepperService {
  steps!: Step[];
  activeStep!: ActiveStep

  init(steps: Step[]): void {
    this.steps = steps;
    this.activeStep = {...steps[0], index: 0}
  }

  constructor() { }
}
