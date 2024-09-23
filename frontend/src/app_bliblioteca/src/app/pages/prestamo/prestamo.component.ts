import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


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

  id: string = '';
  rol: string = 'user';
  filteredLoans = [...this.loans]

  //propiedades para el modal
  selectedLoan: any;
  modalAction: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}


  ngOnInit(): void {
    // Obtener los parámetros de la URL
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || '';
      this.rol = params.get('rol') || 'user';
      this.handleSearch(this.id);
      this.filteredLoans = [...this.loans];
    });
  }

  handleSearch(query: string) {
    if (query) {
      this.filteredLoans = this.loans.filter(loan =>
        loan.bookTitle.toLowerCase().includes(query.toLowerCase()) ||
        loan.user.toLowerCase().includes(query.toLowerCase())      ||
        loan.startDate.toLowerCase().includes(query.toLowerCase())  ||
        loan.endDate.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.filteredLoans = [...this.loans];
    }
  }
}
