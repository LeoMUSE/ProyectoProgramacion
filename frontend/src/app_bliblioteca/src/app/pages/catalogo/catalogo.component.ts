import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearLibroComponent } from '../../components/modals/admin-modals/crear-libro/crear-libro.component';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  books = [
    {
      id: 1,
      img: 'assets/señor_d_a.jpeg',
      title: 'El señor de los Anillos',
      author: 'J.R.R. Tolkien',
      description: 'Una épica de J.R.R. Tolkien donde Frodo Bolsón y sus compañeros intentan destruir un anillo maldito para salvar al mundo de la oscuridad.',
      rating: 5,
      quantity: 5
    },
    {
      id: 2,
      img: 'assets/codigo_d.jpeg',
      title: 'El Código Da Vinci',
      author: 'Dan Brown',
      description: 'Un thriller en el que un profesor de simbología investiga un asesinato en el Louvre y descubre un misterio que podría cambiar la historia.',
      rating: 5,
      quantity: 3
    },
    {
      id: 3,
      img: 'assets/alicia.jpeg',
      title: 'Alicia en el País de Las Maravillas',
      author: 'Lewis Carroll',
      description: 'Una joven llamada Alicia cae en un mundo fantástico lleno de personajes y situaciones absurdas, donde vive una serie de aventuras surrealistas.',
      rating: 5,
      quantity: 4
    },
    // Agrega más libros según sea necesario
  ];

  constructor(private dialog: MatDialog) {}

  openAddBookDialog(): void {
    const dialogRef = this.dialog.open(CrearLibroComponent, {
      width: '500px',
      data: {} // Puedes pasar datos adicionales aquí si lo necesitas
    });
  }
}
