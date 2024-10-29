import { Component } from '@angular/core';
import { LibrosService } from '../../services/books/libros.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  showDropdown: boolean = false;
  searchResults: any[] = [];

  constructor(private bookService: LibrosService) {}

  handleSearch(query: string) {
    if (query) {
      this.bookService.getBooks(1, { titulo: query }).subscribe(
        (response: any) => {          
          if (response && response.libros) {
            this.searchResults = response.libros;
          } else {
            this.searchResults = [];
          }
          this.showDropdown = this.searchResults.length > 0;
        },
        (error) => {
          console.error('Error al buscar libros:', error);
          this.searchResults = [];
          this.showDropdown = false;
        }
      );
    } else {
      this.showDropdown = false;
      this.searchResults = [];
    }
  }
}
