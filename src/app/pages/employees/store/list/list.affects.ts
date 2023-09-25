import { User } from "./list.models";
import * as fromActions from './list.actions';
import {Actions, ofType, createEffect} from '@ngrx/effects';
import {AngularFirestore} from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, switchMap, take } from "rxjs";
import { extractDocumentChangeActionData } from "src/app/shared";

type Action = fromActions.All;

@Injectable()
export class ListEffects {

    constructor(
        private actions: Actions,
        private afs: AngularFirestore
    ){}

    read: Observable<Action> = createEffect(() => 
        this.actions.pipe(
            ofType(fromActions.Types.READ),
            switchMap(() =>
            this.afs.collection<User>('users', ref => ref.where('roleId', '==', 'employee').snapshotChanges().pipe(
                take(1),
                map(changes => changes.map( x => extractDocumentChangeActionData(x, false))),
                map((items: User[]) => new fromActions.ReadSuccess(items)),
                catchError(err => of(new fromActions.ReadError(err.message)))
            )))
        )
    );
}