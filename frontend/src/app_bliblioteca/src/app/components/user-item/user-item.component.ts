import { Component, Input } from '@angular/core';

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

  toggleIcon() {
    if (this.isReviewPage) {
      this.user.deleted = !this.user.deleted;  // Simula el borrado
    } else {
      this.user.locked = !this.user.locked;
    }
  }

  iconColor(): string {
    return this.isReviewPage ? '#EC704B' : (this.user.locked ? '#EC704B' : '#A0F199');
  }

  getIconClass(): string {
    return this.isReviewPage ? 'fas fa-trash' : (this.user.locked ? 'fas fa-lock' : 'fas fa-unlock');
  }
}
