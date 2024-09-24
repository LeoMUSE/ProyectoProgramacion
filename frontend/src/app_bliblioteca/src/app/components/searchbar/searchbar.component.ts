import { Component, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  @Output() searchEvent = new EventEmitter<string>();

  constructor(private location: Location) {}

  searchQuery: string = '';

  onSearch() {
    console.log('buscar: ', this.searchQuery);
    this.searchEvent.emit(this.searchQuery)
  }

  goBack() {
    this.location.back()
  }
}
