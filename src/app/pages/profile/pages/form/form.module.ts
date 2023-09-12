import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule, InputModule, AutocompleteModule } from 'src/app/shared/controls';
import { FilesUploadModule } from 'src/app/shared/popups';
import { SpinnerModule } from 'src/app/shared/indicators';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { StepperModule } from './components';
import { PersonalComponent } from './components/personal/personal.component';
import { ProfessionalComponent } from './components/professional/professional.component';


@NgModule({
  declarations: [
    FormComponent,
    PersonalComponent,
    ProfessionalComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    StepperModule,
    FormFieldModule,
    InputModule,
    AutocompleteModule,
    FilesUploadModule,
    SpinnerModule
  ]
})
export class FormModule { }
