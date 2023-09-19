import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule, InputModule, AutocompleteModule, SelectModule, CheckboxesModule, RadiosModule, DateRangeModule } from 'src/app/shared/controls';
import { FilesUploadModule } from 'src/app/shared/popups';
import { SpinnerModule } from 'src/app/shared/indicators';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { StepperModule } from './components';
import { PersonalComponent } from './components/personal/personal.component';
import { ProfessionalComponent } from './components/professional/professional.component';

import { ButtonModule, UserPhotoModule } from 'src/app/shared';
import { EmployeeComponent } from './components/professional/roles/employee/employee.component';
import { RecruiterComponent } from './components/professional/roles/recruiter/recruiter.component';
import { ExperienceComponent } from './components/professional/roles/employee/experience/experience.component';
import { MapperService } from './services';


@NgModule({
  declarations: [
    FormComponent,
    PersonalComponent,
    ProfessionalComponent,
    EmployeeComponent,
    RecruiterComponent,
    ExperienceComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    StepperModule,
    FormFieldModule,
    InputModule,
    AutocompleteModule,
    FilesUploadModule,
    SpinnerModule,
    ReactiveFormsModule,
    UserPhotoModule,
    SelectModule,
    CheckboxesModule,
    RadiosModule,
    DateRangeModule,
    ButtonModule
  ],
  providers: [
    MapperService
  ]
})
export class FormModule { }
