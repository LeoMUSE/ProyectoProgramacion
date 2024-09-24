import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CrearUserComponent } from '../../components/modals/admin-modals/crear-user/crear-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  usersList = [
    {
      id: 'user1',
      img: 'assets/EmmaCeleron.png',
      username: 'EmCalde',
      name: 'Emma Calderon',
      phone: '2610931231',
      email: 'emmaCalde@gmail.com',
      dni: '4231234122',
      role: 'Usuario',
      locked: false
    },
    {
      id: 'user2',
      img: 'assets/LioGoat.png',
      username: 'LioGoat',
      name: 'Lionel Messi',
      phone: '2612345678',
      email: 'lionel.messipsg@gmail.com',
      dni: '12345678',
      role: 'Usuario',
      locked: false
    },
    {
      id: 'user3',
      img: 'assets/AnAgilera.png',
      username: 'AnaAguilarOk',
      name: 'Ana Aguilar',
      phone: '2640987654',
      email: 'ana.aguilar@gmail.com',
      dni: '87654321',
      role: 'Usuario',
      locked: false
    },
    {
      id: 'user4',
      img: 'assets/LidiaPau.png',
      username: 'LidiaPau',
      name: 'Lidia Paula Moreno',
      phone: '2654321987',
      email: 'lidia.moreno@gmail.com',
      dni: '19876543',
      role: 'Usuario',
      locked: false
    },
    {
      id: 'user5',
      img: 'assets/Guille10.png',
      username: 'Guille10',
      name: 'Guillermo Roces',
      phone: '2676543210',
      email: 'guille.roces@gmail.com',
      dni: '21098765',
      role: 'Usuario',
      locked: false
    },
    {
      id: 'user6',
      img: 'assets/PepitoF.png',
      username: 'PepitoF',
      name: 'José Flores',
      phone: '2698765432',
      email: 'jose.flores@gmail.com',
      dni: '43210987',
      role: 'Moderador',
      locked: false
    },
    {
      id: 'user7',
      img: 'assets/MartaAg2024.png',
      username: 'MartAg2024',
      name: 'Marta Aguiirre',
      phone: '2619988777',
      email: 'marta.aguiirre@gmail.com',
      dni: '77788999',
      role: 'Usuario',
      locked: false
    }
  ];

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {}

  filteredUsers = [...this.usersList]

  ngOnInit(): void {
      this.filteredUsers = [...this.usersList]
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

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(CrearUserComponent, {
      width: '500px',
      data: {} // Puedes pasar datos adicionales aquí si lo necesitas
    });
  }
}
