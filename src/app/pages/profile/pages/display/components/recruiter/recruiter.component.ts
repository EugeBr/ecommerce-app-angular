import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Recruiter } from 'src/app/store/user';

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecruiterComponent {
  @Input() role!: Recruiter | any;

  constructor(){}

}
