import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dictionaries } from 'src/app/store/dictionaries';
import { RecruiterForm } from '../recruiter/recruiter.component';

export interface EmployeeForm {
  specialization: string;
  skills: string[];
  qualification: string;
  expectedSalary: number;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  @Input() parent!: FormGroup;
  @Input() name!: string;

  @Input() value!: EmployeeForm | RecruiterForm;
  @Input() dictionaries!: Dictionaries | null;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      expectedSalary: [null, {
        updateOn: 'blur', validators: [
          Validators.required
        ]
      }],
      specialization: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }],
      qualification: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }],
      skills: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }]
    });

    if(this.value) {
      this.form.patchValue(this.value);
    }

    this.parent.addControl(this.name, this.form);

  }

  ngOnDestroy(): void {
    this.parent.removeControl(this.name);
  }

}
