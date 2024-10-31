import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbmModalComponent } from '../../components/modals/abm-modal/abm-modal.component';
import { UsuariosService } from '../../services/users/usuarios.service';
import { catchError, of, race, tap } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{

  constructor(
    private dialog: MatDialog,
    private usuarioService: UsuariosService
  ) {}

  usersList:any[] = [];
  filteredUsers:any = [];
  currentPage: number = 1;
  totalPages: number = 1;

  currentFilter: { type: string, value: string } | null = null;

  ngOnInit(): void {
    this.fetchUsers(1)
  }

  fetchUsers(page: number, params?: { rol?: string, estado?: string }): void {
    this.usuarioService.getUsers(page, params).subscribe((rta: any) => {
      this.usersList = rta.usuarios || [];
      this.filteredUsers = [...this.usersList];
      this.totalPages = rta.pages;
    });
  }

  handleSearch(query: string) {
    if (query) {
      this.usuarioService.getUsers(1, { nombre: query }).subscribe(
        (reseponse: any) => {
          if (reseponse && reseponse.usuarios) {
            this.filteredUsers = reseponse.usuarios;
          } else {
            this.filteredUsers = [...this.usersList];
          }
        }
      )
    }
  }


  handleActionEvent(event: { action: string, user: any }) {
    if (event.action === 'accept') {
      this.acceptUser(event.user)
    } else if (event.action === '') {
      this.refreshUserList()
    } else if (event.action === 'edit') {
      this.openABMUserModal(event.user, 'edit');
    } else if (event.action === 'delete' || event.action === 'decline') {
      this.usuarioService.deleteUser(event.user.id).subscribe({
        next: () => {
          this.refreshUserList();
        },
        error: (err) => {
          console.error('Error al eliminar el usuario', err)
        }
      })
    }
  }

  openABMUserModal(userData: any, operation: string): void {
    const dialogRef = this.dialog.open(AbmModalComponent, {
      width: '500px',
      data: {
        formType: 'user',
        formOperation: operation,
        ...userData
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (operation === 'create') {
          this.usuarioService.postUser(result).subscribe(() => {
            this.refreshUserList();
          });
        } else if (result) {
          if (operation === 'edit') {
            this.usuarioService.updateUser(userData.id, result).subscribe(() => {
              this.refreshUserList();
            });
          }
        }
      }
    })
  }

  refreshUserList(): void {
    this.fetchUsers(this.currentPage, this.currentFilter ? { [this.currentFilter.type]: this.currentFilter.value } : {});
  }

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.fetchUsers(this.currentPage);
    }
  }

  handleFilterChange(option: { type: string, value: string }): void {
    let filters: any = {};

    // Ajustar el manejo de tipos de filtro
    if (option.value === 'Usuario' || option.value === 'Admin' || option.value === 'Bibliotecario' || option.value === 'Pendiente') {
        filters.rol = option.value;
    } else if (option.value === '0' || option.value === '1') {
        filters.estado = option.value;
    }
    
    // Actualiza el filtro actual
    this.currentFilter = { type: option.type, value: option.value };
    this.fetchUsers(this.currentPage, filters);
  }

  acceptUser(user: any) {
    this.usuarioService.updateUser(user.id, { rol: 'Usuario' }).subscribe({
      next: () => {
        user.rol = 'Usuario';
      },
      error: (error) => {
        console.error('Error al aceptar usuario', error);
      },
      complete: () => {
        console.log('Usuario aceptado')
      }
    })
  }
}
