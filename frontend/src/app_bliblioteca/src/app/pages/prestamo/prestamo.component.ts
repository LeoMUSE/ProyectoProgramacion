import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CrearResenaComponent } from '../../components/modals/user-modals/crear-resena/crear-resena.component';
import { AbmModalComponent } from '../../components/modals/abm-modal/abm-modal.component';
import { PrestamosService } from '../../services/loans/prestamos.service';


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
      console.log("Llamando a fetchLoans con params:", params); // Debug
      this.loanService.getLoans(page, params).subscribe((rta: any) => {
        console.log("Prestamos API: ", rta); // Debug
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
    if (event.action === 'edit') {
      this.openABMLoanModal(event.loan, 'edit');
    } else if (event.action === 'delete') {
      this.loanService.deleteLoan(event.loan.id).subscribe({
        next: () => {
          console.log('Prestamo eliminado con éxito');
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
          this.loanService.updateLoanInfo(loanData.id, result).subscribe(() => {
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
    console.log("Filtro seleccionado:", option); // Debug
    let filters: any = {};

    // Ajustar el manejo de tipos de filtro
    if (option.value === 'Activo' || option.value === 'Desactivo' || option.value === 'Pendiente') {
        filters.estado = option.value;
    } else if (option.type === 'fecha_proxima') {
        filters.fecha_proxima = option.value;
    }
    
    // Actualiza el filtro actual
    this.currentFilter = { type: option.type, value: option.value };
    console.log("Filtros aplicados:", filters); // Debug
    this.fetchLoans(1, filters);
  }


  isUser() { 
    const tokenRol = localStorage.getItem('token_rol');
  if (tokenRol && tokenRol.includes("Usuario")) {
    return true;
  } else {
    return false;
  }
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
