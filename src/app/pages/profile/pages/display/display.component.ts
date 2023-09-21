import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import * as fromRoot from 'src/app/store';
import * as fromUser from 'src/app/store/user';
import * as fromProfileUser from '../../store/user';
import { map, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayComponent implements OnInit, OnDestroy{

  user$ !: Observable<fromProfileUser.User>;
  isOwProfile$ !: Observable<boolean>;

  constructor(
    private router: ActivatedRoute,
    private store: Store<fromRoot.State>
  ){}

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(fromProfileUser.getUser)) as Observable<fromProfileUser.User>;

    this.router.params.subscribe((param: Params) => {
      const id = param.id;
      this.store.dispatch(new fromProfileUser.Read(id));
      this.isOwProfile$ = this.store.pipe(
        select(fromUser.getUser),
        map(user => user && user.uid === id)
      ) as Observable<boolean>;
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch(new fromProfileUser.Clear());
  }

}
