import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrl: './prestamo.component.css'
})
export class PrestamoComponent implements OnInit{
  loans = [
    {
      user: 'EmCalde',
      bookTitle: 'El Código Da Vinci',
      startDate: '15/08/2024',
      endDate: '15/09/2024',
      status: 'Activo',
      image: 'assets/codigo_d.jpeg'
    },
    {
      user: 'PepitoF.',
      bookTitle: 'Harry Potter y el Prisionero de Azkaban',
      startDate: '12/08/2024',
      endDate: '12/09/2024',
      status: 'Activo',
      image: 'assets/hp-pa.jpeg'
    },
    {
      user: 'Guille10',
      bookTitle: 'Alicia en el País de las Maravillas',
      startDate: '08/08/2024',
      endDate: '08/09/2024',
      status: 'Activo',
      image: 'assets/alicia.jpeg'
    },
    {
      user: 'Guille10',
      bookTitle: 'Violeta',
      startDate: '08/08/2024',
      endDate: '08/09/2024',
      status: 'Activo',
      image: 'assets/violeta.jpeg'
    }
  ];

  filteredLoans = [...this.loans]

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Si deseas que se cargue una búsqueda desde la URL
    const searchParam = this.router.getCurrentNavigation()?.extras.state?.['searchQuery'];
    if (searchParam) {
      this.handleSearch(searchParam);
    }
  }

  handleSearch(query: string) {
    this.filteredLoans = this.loans.filter(loan => 
      loan.bookTitle.toLowerCase().includes(query.toLowerCase()) ||
      loan.user.toLowerCase().includes(query.toLowerCase())
    );

    // Si deseas navegar a la misma ruta con el parámetro de búsqueda
    this.router.navigate(['./prestamos'], { state: { searchQuery: query } });
  }
}
