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
    console.log('Search query:', query); // Log para ver el query
    if (query) {
      this.bookService.getBooks(1, { titulo: query }).subscribe(
        (response: any) => {
          console.log('Search response:', response); // Log para ver la respuesta
          
          if (response && response.libros) {
            this.searchResults = response.libros;
          } else {
            this.searchResults = [];
          }
          
          console.log('Search results:', this.searchResults); // Log para ver los resultados de búsqueda
          this.showDropdown = this.searchResults.length > 0;
          console.log('Show dropdown:', this.showDropdown); // Log para ver si showDropdown es true
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
