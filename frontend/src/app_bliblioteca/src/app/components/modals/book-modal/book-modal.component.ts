import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrl: './book-modal.component.css'
})
export class BookModalComponent {
  @Input() book: any;

  constructor(private modalService: NgbModal) { }

  openModal(content: any) {
    this.modalService.open(content)
  }

  closeModal() {
    this.modalService.dismissAll()
  }
}
