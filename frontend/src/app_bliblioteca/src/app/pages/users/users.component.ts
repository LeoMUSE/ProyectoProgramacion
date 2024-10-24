import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AbmModalComponent } from '../../components/modals/abm-modal/abm-modal.component';
import { UsuariosService } from '../../services/users/usuarios.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  constructor(
    private route: ActivatedRoute, 
    private dialog: MatDialog,
    private usuarioService: UsuariosService
  ) {}

  usersList:any[] = []

  filteredUsers:any = []

  ngOnInit(): void {
      this.usuarioService.getUsers(1).subscribe((rta: any) => {
        console.log("Usuarios Api: ", rta);
        this.usersList = rta.usuarios || [];
        this.filteredUsers = [...this.usersList]
      })
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
    this.usuarioService.getUsers(1).subscribe((rta: any) => {
      console.log('Usuarios api: ', rta);
      this.usersList = rta.usuarios || [];
      this.filteredUsers = [...this.filteredUsers]
    })
  }
}
