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
  id: string = '';
  rol: string = 'user';

  constructor(
    private dialog: MatDialog,
    private loanService: PrestamosService

  ) {}

  loanList:any[] = []

  filteredLoans:any = []


  ngOnInit(): void {
    // Obtener los parámetros de la URL
    // this.route.paramMap.subscribe(params => {
    //   this.id = params.get('id') || '';
    //   this.rol = params.get('rol') || 'user';
    //   // this.handleSearch(this.id);
    // });
    //const params = { cant_prestamos: "3"}
    const tokenRol = localStorage.getItem('token_rol');
    const tokenUserId = localStorage.getItem('user_id');

    const params = tokenRol === 'Usuario' && tokenUserId ? { idUsuario: tokenUserId } : {};

    this.loanService.getLoans(1, params).subscribe((rta: any) => {
      console.log("Prestamos Api: ", rta);
      this.loanList = rta.prestamos || [];
      this.filteredLoans = [...this.loanList]
    }
  )
  }

  // handleSearch(query: string) {
  //   if (query) {
  //     this.filteredLoans = this.loans.filter(loan =>
  //       loan.bookTitle.toLowerCase().includes(query.toLowerCase()) ||
  //       loan.user.toLowerCase().includes(query.toLowerCase())      ||
  //       loan.startDate.toLowerCase().includes(query.toLowerCase())  ||
  //       loan.endDate.toLowerCase().includes(query.toLowerCase())
  //     );
  //   } else {
  //     this.filteredLoans = [...this.loans];
  //   }
  // }

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
    this.loanService.getLoans(1).subscribe((rta: any) => {
      console.log("Libros api: ", rta);
      this.loanList = rta.prestamos || [];
      this.filteredLoans = [...this.loanList];
    })
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
