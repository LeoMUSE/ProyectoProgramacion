import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearResenaComponent } from '../../components/modals/user-modals/crear-resena/crear-resena.component';
import { AbmModalComponent } from '../../components/modals/abm-modal/abm-modal.component';
import { PrestamosService } from '../../services/loans/prestamos.service';
import { ReseñasService } from '../../services/reviews/reseñas.service';


@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrl: './prestamo.component.css'
})
export class PrestamoComponent implements OnInit{

  constructor(
    private dialog: MatDialog,
    private loanService: PrestamosService,
    private reviewService: ReseñasService
  ) {}

  loanList:any[] = []
  filteredLoans:any[] = []
  currentPage: number = 1;
  totalPages: number = 1;

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
        this.totalPages = rta.pages;
      });
    }

  handleSearch(query: string) {
    if (query) {
      this.filteredLoans = this.loanList.filter(loan =>
        loan.titulo.toLowerCase().includes(query.toLowerCase()) ||
        loan.usuario.user.toLowerCase().includes(query.toLowerCase())      ||
        loan.inicio_fecha.toLowerCase().includes(query.toLowerCase())  ||
        loan.fin_fecha.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.filteredLoans = [...this.loanList];
    }
  }

  handleActionEvent(event: { action: string, loan: any }) {
    if (event.action === 'accept') {
      this.acceptLoan(event.loan);
    } else if (event.action === '') {
      this.refreshLoanList()
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

    this.fetchLoans(this.currentPage, { ...params, ...(this.currentFilter ? { [this.currentFilter.type]: this.currentFilter.value } : {}) });
  }

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.fetchLoans(this.currentPage);
    }
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
    this.fetchLoans(this.currentPage, filters);
  }

  openRealizarResena(loan: any): void {
    if (!loan || !loan.libro || loan.libro.length === 0) {
        console.error("El objeto loan o loan.libro es undefined o está vacío", loan);
        return;
    }

    const params = { idLibro: loan.libro[0].id };
    this.reviewService.getReviews(1, params).subscribe(reviewsResponse => {
        const dialogRef = this.dialog.open(CrearResenaComponent, {
            width: '500px',
            data: {
                loan: loan,
                reviews: (reviewsResponse as any).reseñas
            }
        });
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
