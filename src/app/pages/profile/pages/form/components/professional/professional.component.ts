import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StepperService } from '../stepper/services';
import { Dictionaries } from 'src/app/store/dictionaries';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormGroupTouched, regexErrors } from 'src/app/shared';
import { RecruiterForm } from './roles/recruiter/recruiter.component';
import { EmployeeForm } from './roles/employee/employee.component';

export interface ProfesionalForm {
  about?: string | null;
  roleId?: string | null;
  role?: RecruiterForm | EmployeeForm | null;
}

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfessionalComponent implements OnDestroy, OnInit {

  @Input() value!: ProfesionalForm;
  @Input() dictionaries!: Dictionaries | null;

  @Output() changed = new EventEmitter<ProfesionalForm>();

  form!: FormGroup;
  regexErrors = regexErrors;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private stepper: StepperService
  ) { }

  private destroy = new Subject<any>();

  ngOnInit(): void {
    this.form = this.fb.group({
      roleId: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }],
      about: [null, {
        updateOn: 'blur', validators: [
          Validators.required
        ]
      }]
    });

    if (this.value) {
      this.form.patchValue(this.value);
    }

    this.stepper.check.pipe(takeUntil(this.destroy)).subscribe((type) => {
      if (!this.form.valid) {
        markFormGroupTouched(this.form);
        this.form.updateValueAndValidity();
        this.cdr.detectChanges();
      } else {
        this.changed.emit(this.form.value);
      }

      this.stepper[type].next(this.form.valid);
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }


}
