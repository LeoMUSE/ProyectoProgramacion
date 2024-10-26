import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.css'
})
export class UserItemComponent {
  @Input() user: any;
  @Input() review: any;
  @Input() isReviewPage: boolean = false;
  @Input() showDropdown: boolean = true;
  @Output() actionEvent = new EventEmitter<{action: string, user: any}>();


  toggleIcon() {
    if (this.isReviewPage) {
      this.user.deleted = !this.user.deleted;  // Simula el borrado
    } else {
      this.user.locked = !this.user.locked;
    }
  }

  handleEditDelete(action: string) {
    this.actionEvent.emit({ action, user: this.user });
  }
}
