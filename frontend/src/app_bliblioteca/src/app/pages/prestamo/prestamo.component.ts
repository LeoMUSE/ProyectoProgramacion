import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditarPrestamoComponent } from '../../components/modals/admin-modals/editar-prestamo/editar-prestamo.component';
import { CrearPrestamoComponent } from '../../components/modals/admin-modals/crear-prestamo/crear-prestamo.component';


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
      startDate: '2024-08-15',
      endDate: '2024-09-15',
      status: 'Activo',
      image: 'assets/codigo_d.jpeg'
    },
    {
      user: 'PepitoF.',
      bookTitle: 'Harry Potter y el Prisionero de Azkaban',
      startDate: '2024-08-12',
      endDate: '2024-09-12',
      status: 'Activo',
      image: 'assets/hp-pa.jpeg'
    },
    {
      user: 'Guille10',
      bookTitle: 'Alicia en el País de las Maravillas',
      startDate: '2024-08-08',
      endDate: '2024-09-08',
      status: 'Activo',
      image: 'assets/alicia.jpeg'
    },
    {
      user: 'Guille10',
      bookTitle: 'Violeta',
      startDate: '2024-08-08',
      endDate: '2024-09-08',
      status: 'Activo',
      image: 'assets/violeta.jpeg'
    }
  ];

  id: string = '';
  rol: string = 'user';
  filteredLoans = [...this.loans]

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {}


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

  openEditLoanModal(loan: any): void {
    const dialogRef = this.dialog.open(EditarPrestamoComponent, {
      width: '500px',
      data: { ...loan } // Pasa los datos del préstamo seleccionado
    });
  }

  openAddLoanDialog(): void {
    const dialogRef = this.dialog.open(CrearPrestamoComponent, {
      width: '500px',
      data: {} // Puedes pasar datos adicionales aquí si lo necesitas
    });
  }
}
