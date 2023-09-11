import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StepperService } from '../stepper/services';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.css']
})
export class ProfessionalComponent implements OnDestroy, OnInit {

  constructor(
    private stepper: StepperService
  ) {}

  ngOnInit(): void {
    this.stepper.check.pipe(takeUntil(this.destroy)).subscribe((type) => {
      this.stepper[type].next(true);
    });
  }
  private destroy = new Subject<any>();

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }


}
