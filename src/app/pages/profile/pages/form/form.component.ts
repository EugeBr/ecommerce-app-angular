import { Component, OnDestroy, OnInit } from '@angular/core';
import { StepperService } from './components/stepper/services';
import { Observable, Subject, takeUntil } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/store';
import * as fromDictionaries from 'src/app/store/dictionaries';
import * as fromUser from 'src/app/store/user';
import { PersonalForm } from './components/personal/personal.component';
import { ProfesionalForm } from './components/professional/professional.component';
import { ActivatedRoute, Router } from '@angular/router';

export interface ProfileForm {
  personal: PersonalForm | null;
  professional: ProfesionalForm | null;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {

  dictionaries$!: Observable<fromDictionaries.Dictionaries>;
  dictionariesIsReady$!: Observable<boolean>;

  private destroy = new Subject<any>();

  private user!: fromUser.User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public stepper: StepperService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {

    this.user = this.route.snapshot.data.user;

    this.dictionaries$ = this.store.pipe(select(fromDictionaries.getDictionaries)) as Observable<any>;
    this.dictionariesIsReady$ = this.store.pipe(select(fromDictionaries.getIsReady)) as Observable<boolean>;
    this.stepper.init([
      {key: 'professional', label: 'Profesional'},
      {key: 'personal', label: 'Personal'}
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

  onChangedPersonal(data: PersonalForm): void {
    console.log('personal data', data);
  }

  onChangedProfesional(data: ProfesionalForm): void {
    console.log('profesional data', data);
  }

}
