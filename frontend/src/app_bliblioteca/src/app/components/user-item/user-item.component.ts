import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.css'
})
export class UserItemComponent {
  @Input() user: any;

  toggleLock() {
    this.user.locked = !this.user.locked;
  }

  lockIconColor(): string {
    return this.user.locked ? '#EC704B' : '#A0F199';
  }
}
