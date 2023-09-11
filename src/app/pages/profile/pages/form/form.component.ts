import { Component, OnDestroy, OnInit } from '@angular/core';
import { StepperService } from './components/stepper/services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy{

  private destroy = new Subject<any>();

  constructor(
    public stepper: StepperService
  ) {}

  ngOnInit(): void {
    this.stepper.init([
      {key: 'personal', label: 'Personal'},
      {key: 'professional', label: 'Profesional'}
    ])

    this.stepper.complete$.pipe(takeUntil(this.destroy)).subscribe(() => {
      console.log('stepper completado');
    })

    this.stepper.cancel$.pipe(takeUntil(this.destroy)).subscribe(() => {
      console.log('stepper cancelado');
    })
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

}
