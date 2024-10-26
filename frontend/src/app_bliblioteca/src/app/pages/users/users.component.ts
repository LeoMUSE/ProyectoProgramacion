import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbmModalComponent } from '../../components/modals/abm-modal/abm-modal.component';
import { UsuariosService } from '../../services/users/usuarios.service';

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
  currentFilter: { type: string, value: string } | null = null;

  ngOnInit(): void {
    this.fetchUsers(1)
  }

  fetchUsers(page: number, params?: { rol?: string, estado?: string }): void {
    console.log("Llamando a fetchUsers con params:", params); // Debug
    this.usuarioService.getUsers(page, params).subscribe((rta: any) => {
      console.log("Usuarios API: ", rta); // Debug
      this.usersList = rta.usuarios || [];
      this.filteredUsers = [...this.usersList];
    });
  }

  handleSearch(query: string) {
    console.log('Buscar: ', query);
    if (query) {
      this.filteredUsers = this.usersList.filter(user =>
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.id.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.filteredUsers = [...this.usersList]; // Restablece si no hay búsqueda
    }
  }


  handleActionEvent(event: { action: string, user: any }) {
    if (event.action === 'edit') {
      this.openABMUserModal(event.user, 'edit');
    } else if (event.action === 'delete') {
      this.usuarioService.deleteUser(event.user.id).subscribe({
        next: () => {
          console.log('Usuario eliminado con éxito');
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
      console.log('El modal se cerró', result);
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
    this.fetchUsers(1, this.currentFilter ? { [this.currentFilter.type]: this.currentFilter.value } : {});
  }

  handleFilterChange(option: { type: string, value: string }): void {
    console.log("Filtro seleccionado:", option); // Debug
    let filters: any = {};

    // Ajustar el manejo de tipos de filtro
    if (option.value === 'Usuario' || option.value === 'Admin' || option.value === 'Bibliotecario') {
        filters.rol = option.value;
    } else if (option.value === '0' || option.value === '1') {
        filters.estado = option.value;
    }
    
    // Actualiza el filtro actual
    this.currentFilter = { type: option.type, value: option.value };
    console.log("Filtros aplicados:", filters); // Debug
    this.fetchUsers(1, filters);
}
}
