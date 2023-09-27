import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { User } from '../../store/list';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent {

  @Input() employee!: User;

  constructor(){}

}
