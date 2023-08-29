import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Router } from "@angular/router";

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

import { Observable, from, of } from "rxjs";
import { map, switchMap, catchError, take, tap, withLatestFrom } from "rxjs/operators";

import { environment } from '@src/environments/environments';

import { User } from "./user.models";

import * as fromActions from './user.actions';

import { NotificationService } from "src/app/services";

type Action = fromActions.All;

@Injectable()
export class UserEffects {
    constructor(
        private actions: Actions,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: NotificationService
    ) { }

    signUpEmail: Observable<Action> = createEffect(() =>
        this.actions.pipe > (
            ofType(fromActions.Types.SIGN_UP_EMAIL),
            map((action: fromActions.SignUpEmail) => action.credentials),
            switchMap(credentials =>
                from(this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)).pipe(
                    tap(() => {
                        firebase.auth().currentUser?.sendEmailVerification(
                            environment.actionCodeSettings
                        );
                    }),
                    map((signUpState) => new fromActions.SignUpEmailSuccess(signUpState.user ? signUpState.user.uid : '')),
                    catchError(err => {
                        return of(new fromActions.SignUpEmailError(err.message))
                    })
                )
            )
        )
    );

    signInEmail: Observable<Action> = createEffect(() =>
        this.actions.pipe > (
            ofType(fromActions.Types.SIGN_IN_EMAIL),
            map((action: fromActions.SignInEmail) => action.credentials),
            switchMap(credentials =>
                from(this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password)).pipe(
                    switchMap(singInState =>
                        this.afs.doc<User>(`users/${singInState.user ? singInState.user?.uid : ''}`).valueChanges().pipe(

                            take(1),
                            tap(() => {
                                this.router.navigate(['/']);
                            }),
                            map(user => new fromActions.SignInEmailSuccess(singInState.user ? singInState.user?.uid : '', user || null))
                        )),
                    catchError(err => {
                        return of(new fromActions.SignUpEmailError(err.message))
                    })
                )
            )
        )
    );

    signOut: Observable<Action> = createEffect(() =>
        this.actions.pipe > (
            ofType(fromActions.Types.SIGN_OUT_EMAIL),
            switchMap( () =>
                from(this.afAuth.signOut() ).pipe(
                    map( () => new fromActions.SignOutSuccess()),
                    catchError(err => {
                        return of(new fromActions.SignOutError(err.message))
                    })
                )
            )
        )
    );

    init: Observable<Action> = createEffect(() =>
    this.actions.pipe > (
        ofType(fromActions.Types.INIT),
        switchMap( () => this.afAuth.authState.pipe(take(1))),
        switchMap( authState => {
            if(authState){
                return this.afs.doc<User>(`users/${authState.uid}`).valueChanges().pipe(
                    take(1),
                    map(user => new fromActions.InitAuthorized(authState.uid, user || null)),
                    catchError(err => of(new fromActions.InitError(err.message)))
                )
            }else{
                return of(new fromActions.InitUnauthorized());
            }
        })
    )
);

}
