import { Component, OnInit } from '@angular/core';
import {Store, select} from '@ngrx/store';
import * as fromRoot from './store';
import * as fromDictionaries from './store/dictionaries';
import * as fromUser from './store/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce-app-angular';
  isAuthorized$ !: Observable<boolean>;

  user$!: Observable<fromUser.User>;

  constructor(private store: Store<fromRoot.State>){}

  ngOnInit(){
    this.user$ = this.store.pipe(select(fromUser.getUser)) as Observable<fromUser.User>;
    this.isAuthorized$ = this.store.pipe(select(fromUser.getIsAuthorized))

    this.store.dispatch(new fromUser.Init());
    this.store.dispatch(new fromDictionaries.Read());
  }

  onSignOut(): void {
    this.store.dispatch(new fromUser.SignOut());
  }
}
