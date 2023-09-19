import { Component, OnDestroy, OnInit } from '@angular/core';
import { StepperService } from './components/stepper/services';
import { Observable, Subject, switchMap, takeUntil, zip } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/store';
import * as fromDictionaries from 'src/app/store/dictionaries';
import * as fromUser from 'src/app/store/user';
import { PersonalForm } from './components/personal/personal.component';
import { ProfesionalForm } from './components/professional/professional.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MapperService } from './services';
import * as fromForm from '../../store/form';

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

  personal$ !: Observable<PersonalForm>;
  professional$ !: Observable<ProfesionalForm>;

  private profile$ !: Observable<ProfileForm>;

  private isEditing !: boolean;

  private destroy = new Subject<any>();

  private user!: fromUser.User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public stepper: StepperService,
    private store: Store<fromRoot.State>,
    private mapper: MapperService
  ) {}

  ngOnInit(): void {

    this.user = this.route.snapshot.data.user;
    this.isEditing = !!this.user;

    this.profile$ = this.store.pipe(select(fromForm.getFormState));
    this.personal$ = this.store.pipe(select(fromForm.getPersonalForm)) as Observable<PersonalForm>;
    this.professional$ = this.store.pipe(select(fromForm.getProfessionalForm)) as Observable<ProfesionalForm>;

    if(this.user) {
      const form = this.mapper.userToForm(this.user);
      this.store.dispatch(new fromForm.Set(form))
    }

    this.dictionaries$ = this.store.pipe(select(fromDictionaries.getDictionaries)) as Observable<any>;
    this.dictionariesIsReady$ = this.store.pipe(select(fromDictionaries.getIsReady)) as Observable<boolean>;
    this.stepper.init([
      {key: 'professional', label: 'Profesional'},
      {key: 'personal', label: 'Personal'}
    ]);

    this.stepper.complete$.pipe(
      switchMap(() => zip(this.profile$, this.dictionaries$)),
      takeUntil(this.destroy)
      ).subscribe(([profile, dictionaries]) => {
      this.onComplete(profile, this.user, dictionaries)
    });

    this.stepper.cancel$.pipe(takeUntil(this.destroy)).subscribe(() => {
      console.log('stepper cancelado');
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  onChangedPersonal(data: PersonalForm): void {
    this.store.dispatch(new fromForm.Update({personal: data}))
  }

  onChangedProfesional(data: ProfesionalForm): void {
    this.store.dispatch(new fromForm.Update({professional: data}))
  }

  private onComplete(profile: ProfileForm, user: fromUser.User, dictionaries: fromDictionaries.Dictionaries) : void {
    // create update
    if(this.isEditing) {
      const request = this.mapper.formToUserUpdate(profile, user, dictionaries);
      this.store.dispatch(new fromUser.Update(request));
    }else{
      const request = this.mapper.formToUserCreate(profile, dictionaries);
      this.store.dispatch(new fromUser.Create(request));
    }
  }

}
