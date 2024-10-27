import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent implements OnChanges{
  @Output() searchEvent = new EventEmitter<string>();
  @Input() currentPage: string = '';
  searchQuery: string = '';
  @Output() filterChange = new EventEmitter<{ type: string, value: string }>();
  filterOptions: Array<{ value: string, label: string }> = [];

  constructor (
    private location: Location,
  ) {}

  isAdmin() { 
    const tokenRol = localStorage.getItem('token_rol');
  if (tokenRol && tokenRol.includes("Admin")) {
    return true;
  } else {
    return false;
  }
  }

  ngOnChanges() {
    this.setFilterOptions();
  }

  onSearch() {
    console.log('buscar: ', this.searchQuery);
    this.searchEvent.emit(this.searchQuery)
  }

  goBack() {
    this.location.back()
  }

  setFilterOptions() {
    const clearFilterOption = { value: '', label: 'Quitar filtros' };

    switch (this.currentPage) {
      case 'catalogo':
        this.filterOptions = [
          clearFilterOption,
          {value: 'user', label: 'Usuarios'},
          {value: 'book', label: 'Libros'},
          {value: 'status', label: 'Estado'}
        ];
        break;
      case 'prestamo':
        this.filterOptions = [
          clearFilterOption,
          { value: 'Pendiente', label: 'Pendiente' },
          { value: 'Activo', label: 'Activos' },
          { value: 'fecha_proxima', label: 'Fechas Proximas' }
        ];
        break;
        case 'usuarios':
          this.filterOptions = [
            clearFilterOption,
            { value: 'Pendiente', label: 'Pendiente' },
            { value: 'Usuario', label: 'Usuarios' },
            { value: 'Admin', label: 'Administradores' },
            { value: 'Bibliotecario', label: 'Bibliotecarios' },
            { value: '0', label: 'Desbloqueado' },
            { value: '1', label: 'Bloqueado' }
          ];
          break;
      default:
        this.filterOptions = [];
    }
  }

  onFilterChange(type: string, value: string) {
    console.log('Filter changed:', type, value);
    this.filterChange.emit({ type, value });
}

}
