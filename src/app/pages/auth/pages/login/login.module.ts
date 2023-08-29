import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule, InputModule, PasswordModule } from 'src/app/shared';
import { ButtonModule } from 'src/app/shared/buttons';
import { SpinnerModule } from 'src/app/shared/indicators';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormFieldModule,
    InputModule,
    PasswordModule,
    ButtonModule,
    SpinnerModule
  ]
})
export class LoginModule { }
