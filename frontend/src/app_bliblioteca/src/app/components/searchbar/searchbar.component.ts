import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  @Output() searchEvent = new EventEmitter<string>();

  searchQuery: string = '';

  onSearch() {
    this.searchEvent.emit(this.searchQuery)
  }
}
