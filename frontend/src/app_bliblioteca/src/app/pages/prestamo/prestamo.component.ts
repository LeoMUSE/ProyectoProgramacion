import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CrearResenaComponent } from '../../components/modals/user-modals/crear-resena/crear-resena.component';
import { AbmModalComponent } from '../../components/modals/abm-modal/abm-modal.component';
import { PrestamosService } from '../../services/loans/prestamos.service';
import { catchError, of, tap } from 'rxjs';


@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrl: './prestamo.component.css'
})
export class PrestamoComponent implements OnInit{

  constructor(
    private dialog: MatDialog,
    private loanService: PrestamosService
  ) {}

  loanList:any[] = []

  filteredLoans:any[] = []

  currentFilter: { type: string, value: string } | null = null;


  ngOnInit(): void {
    const tokenRol = localStorage.getItem('token_rol');
    const tokenUserId = localStorage.getItem('user_id');

    const params = tokenRol === 'Usuario' && tokenUserId ? { idUsuario: tokenUserId } : {};
    this.fetchLoans(1, params);
    }

    fetchLoans(page: number, params?: { estado?: string, idUsuario?: string }): void {
      this.loanService.getLoans(page, params).subscribe((rta: any) => {
        this.loanList = rta.prestamos || [];
        this.filteredLoans = [...this.loanList];
      });
    }

  handleSearch(query: string) {
    if (query) {
      this.filteredLoans = this.loanList.filter(loan =>
        loan.bookTitle.toLowerCase().includes(query.toLowerCase()) ||
        loan.user.toLowerCase().includes(query.toLowerCase())      ||
        loan.startDate.toLowerCase().includes(query.toLowerCase())  ||
        loan.endDate.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.filteredLoans = [...this.loanList];
    }
  }

  handleActionEvent(event: { action: string, loan: any }) {
    if (event.action === 'accept') {
      this.acceptLoan(event.loan);
    } else if (event.action === 'edit') {
      this.openABMLoanModal(event.loan, 'edit');
    } else if (event.action === 'delete' || event.action === 'decline') {
      this.loanService.deleteLoan(event.loan.id).subscribe({
        next: () => {
          this.refreshLoanList();
        },
        error: (err) => {
          console.error('Error al eliminar el prestamo', err)
        }
      })
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
      console.log('El modal se cerró', result); 
      // arreglar porque al apretar close se hace el post igual
      if (result) {
        if (operation === 'create') {
          this.loanService.postLoan(result).subscribe(() => {
            this.refreshLoanList();
          });
        } else if (operation === 'edit') {
          this.loanService.updateLoan(loanData.id, result).subscribe(() => {
            this.refreshLoanList();
          })
        }
      }
    })
  }

  refreshLoanList(): void {
    const tokenRol = localStorage.getItem('token_rol');
    const tokenUserId = localStorage.getItem('user_id');
    const params = tokenRol === 'Usuario' && tokenUserId ? { idUsuario: tokenUserId } : {};

    this.fetchLoans(1, { ...params, ...(this.currentFilter ? { [this.currentFilter.type]: this.currentFilter.value } : {}) });
  }

  handleFilterChange(option: { type: string, value: string }): void {
    let filters: any = {};

    // Ajustar el manejo de tipos de filtro
    if (option.value === 'Activo' || option.value === 'Desactivo' || option.value === 'Pendiente') {
        filters.estado = option.value;
    } else if (option.type === 'fecha_proxima') {
        filters.fecha_proxima = option.value;
    }
    
    // Actualiza el filtro actual
    this.currentFilter = { type: option.type, value: option.value };
    this.fetchLoans(1, filters);
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

  // Arreglar put
  acceptLoan(loan: any) {
    this.loanService.updateLoan(loan.id, { estado: 'Activo' }).subscribe({
      next: () => {
        loan.estado = 'Activo';
      },
      error: (error) => {
        console.error('Error al aceptar el préstamo', error);
      },
      complete: () => {
        console.log('Prestamo acceptado');
      }
    });
  }
}
