import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import * as fromRoot from '@app/store';
import * as fromList from './store/list';
import {Store} from '@ngrx/store';

import { User } from './store/list/list.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesComponent implements OnInit{

  employees$!: Observable<User[]>;
  constructor(
    private store: Store<fromRoot.State>
  ){}

  ngOnInit(): void {
    this.employees$ = this.store.pipe(select(fromList.getItems)) as Observable<User[]>;

    this.store.dispatch(new fromList.Read());
  }
}
