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
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Actualiza el préstamo en tu lista con los datos editados
        const index = this.loans.findIndex(l => l.user === result.user && l.bookTitle === result.bookTitle);
        if (index !== -1) {
          this.loans[index] = result;
          this.filteredLoans = [...this.loans];
        }
      }
    });
  }

  openAddLoanDialog(): void {
    const dialogRef = this.dialog.open(CrearPrestamoComponent, {
      width: '500px',
      data: {} // Puedes pasar datos adicionales aquí si lo necesitas
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nuevo préstamo:', result);
        // Aquí puedes manejar el resultado del modal, como guardar el nuevo préstamo.
      }
    });
  }
}
