import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditarPrestamoComponent } from '../../components/modals/admin-modals/editar-prestamo/editar-prestamo.component';
import { CrearPrestamoComponent } from '../../components/modals/admin-modals/crear-prestamo/crear-prestamo.component';
import { CrearResenaComponent } from '../../components/modals/user-modals/crear-resena/crear-resena.component';
import { AbmModalComponent } from '../../components/modals/abm-modal/abm-modal.component';


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

  constructor(
    private route: ActivatedRoute, 
    private dialog: MatDialog
  ) {}


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

  openABMLoanModal(loanData: any, operation: string): void {
    const dialogRef = this.dialog.open(AbmModalComponent, {
      width: '500px',
      data: {
        formType: 'loan',
        formOperation: operation,
        ...loanData
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró', result)
    })
  }

  openRealizarResena(loan: any): void {
    const dialogRef = this.dialog.open(CrearResenaComponent, {
      width: '500px',
      data: {
        loan: loan,
        reviews: [ // Aquí puedes obtener las reseñas actuales de algún servicio o base de datos
          { user: 'EmCalde', text: 'Excelente libro, me encantó.', rating: 5 },
          { user: 'PepitoF.', text: 'Muy interesante, aunque un poco largo.', rating: 4 },
          { user: 'PepitoF.', text: 'Muy interesante, aunque un poco largo.', rating: 3 },
          { user: 'PepitoF.', text: 'Muy interesante, aunque un poco largo.', rating: 2 },
          { user: 'PepitoF.', text: 'Muy interesante, aunque un poco largo.', rating: 1 }
        ]
      }
    });
  }
}
