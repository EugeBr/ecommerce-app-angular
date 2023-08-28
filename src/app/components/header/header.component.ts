import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() isAthorized !: boolean | null;
  @Output() signOut = new EventEmitter<void>();

  constructor() {}

  onSignOut(): void {
    this.signOut.emit();
  }

}
