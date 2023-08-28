import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from './store';
import * as fromDictionaries from './store/dictionaries';
import * as fromUsers from './store/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce-app-angular';

  constructor(private store: Store<fromRoot.State>){}

  ngOnInit(){
    this.store.dispatch(new fromUsers.Init());
    this.store.dispatch(new fromDictionaries.Read());
  }
}
