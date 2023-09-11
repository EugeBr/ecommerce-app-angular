import { Component } from '@angular/core';
import { StepperService } from './services';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent {

  constructor(private stepper: StepperService) {}

  get steps() {
    return this.stepper.steps;
  }

  get activeStep() {
    return this.stepper.activeStep;
  }

  isActive(index: number): boolean {
    return index === this.activeStep.index;
  }

  isCompleted(index: number): boolean {
    return index < this.activeStep.index;
  }

  isFirst(): boolean {
    return this.activeStep.index === 0;
  }

  isLast(): boolean {
    return this.activeStep.index === this.steps.length -1;
  }

  onNext() {
    this.stepper.onNext();
  }

  onComplete() {

  }

  onPrev() {
    this.stepper.onPrev();
  }

  onCancel() {

  }

}
