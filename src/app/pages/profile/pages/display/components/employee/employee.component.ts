import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Employee } from 'src/app/store/user';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent {
  @Input() role!: Employee | any;

  constructor(){}
  
}
