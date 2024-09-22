import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-book-card',
  templateUrl: './home-book-card.component.html',
  styleUrl: './home-book-card.component.css'
})
export class HomeBookCardComponent {
  @Input() book: any; //libro como objeto
  
  constructor() { }
}
