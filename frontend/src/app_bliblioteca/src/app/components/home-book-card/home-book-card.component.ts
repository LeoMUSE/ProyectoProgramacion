import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-home-book-card',
  templateUrl: './home-book-card.component.html',
  styleUrl: './home-book-card.component.css'
})
export class HomeBookCardComponent {
  @Input() book: any; //libro como objeto
  @Output() bookClick = new EventEmitter<any>();

  cardClick() {
    this.bookClick.emit(this.book);
  }
}
