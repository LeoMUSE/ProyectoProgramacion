import { Component, OnInit, TemplateRef } from '@angular/core';
import { BookModalComponent } from '../../components/modals/book-modal/book-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { LibrosService } from '../../services/books/libros.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
//   books = [
//     {
//       title: 'El hombre y sus Símbolos',
//       author: 'Carl Gustav Jung',
//       image: 'assets/el-hombre.jpeg',
//       rating: 4.5,
//       synopsis: 'Esta es la primera y única obra de Carl G. Jung, el famoso psicólogo suizo, dedicada a explicar a los lectores cuál fue su mayor contribución al conocimiento de la mente humana: la teoría del simbolismo y, en especial, el papel que ésta desempeña en los sueños.',
//       genre: 'Psicología, Introspección'  
//     },
//     {
//       title: 'Violeta',
//       author: 'Isabel Allende',
//       image: 'assets/violeta.jpeg',
//       rating: 4.5,
//       synopsis: 'Violeta es la historia de una mujer que vive durante la segunda mitad del siglo XX, en Chile. La novela narra la vida de Violeta, una mujer fuerte y decidida que lucha contra las adversidades.',
//       genre: 'Ficción, Drama'  
//     },
//     {
//       title: 'Roma soy yo',
//       author: 'Santiago Posteguillo',
//       image: 'assets/roma.jpeg',
//       rating: 4.5,
//       synopsis: 'Roma soy yo es una novela que narra la vida de un joven romano en la antigua Roma. Con una trama llena de acción y drama, el libro ofrece una visión fascinante de la vida en la antigua Roma.',
//       genre: 'Historia, Aventuras'  
//     },
//     {
//       title: 'El hombre y sus Símbolos',
//       author: 'Carl Gustav Jung',
//       image: 'assets/el-hombre.jpeg',
//       rating: 4.5,
//       synopsis: 'Esta es la primera y única obra de Carl G. Jung, el famoso psicólogo suizo, dedicada a explicar a los lectores cuál fue su mayor contribución al conocimiento de la mente humana: la teoría del simbolismo y, en especial, el papel que ésta desempeña en los sueños.',
//       genre: 'Psicología, Introspección'  
//     },
//     {
//       title: 'Violeta',
//       author: 'Isabel Allende',
//       image: 'assets/violeta.jpeg',
//       rating: 4.5,
//       synopsis: 'Violeta es la historia de una mujer que vive durante la segunda mitad del siglo XX, en Chile. La novela narra la vida de Violeta, una mujer fuerte y decidida que lucha contra las adversidades.',
//       genre: 'Ficción, Drama'  
//     },
//     {
//       title: 'Roma soy yo',
//       author: 'Santiago Posteguillo',
//       image: 'assets/roma.jpeg',
//       rating: 4.5,
//       synopsis: 'Roma soy yo es una novela que narra la vida de un joven romano en la antigua Roma. Con una trama llena de acción y drama, el libro ofrece una visión fascinante de la vida en la antigua Roma.',
//       genre: 'Historia, Aventuras'  
//     },
//     {
//       title: 'El hombre y sus Símbolos',
//       author: 'Carl Gustav Jung',
//       image: 'assets/el-hombre.jpeg',
//       rating: 4.5,
//       synopsis: 'Esta es la primera y única obra de Carl G. Jung, el famoso psicólogo suizo, dedicada a explicar a los lectores cuál fue su mayor contribución al conocimiento de la mente humana: la teoría del simbolismo y, en especial, el papel que ésta desempeña en los sueños.',
//       genre: 'Psicología, Introspección'  
//     },
//     {
//       title: 'Violeta',
//       author: 'Isabel Allende',
//       image: 'assets/violeta.jpeg',
//       rating: 4.5,
//       synopsis: 'Violeta es la historia de una mujer que vive durante la segunda mitad del siglo XX, en Chile. La novela narra la vida de Violeta, una mujer fuerte y decidida que lucha contra las adversidades.',
//       genre: 'Ficción, Drama'  
//     },
//     {
//       title: 'Roma soy yo',
//       author: 'Santiago Posteguillo',
//       image: 'assets/roma.jpeg',
//       rating: 4.5,
//       synopsis: 'Roma soy yo es una novela que narra la vida de un joven romano en la antigua Roma. Con una trama llena de acción y drama, el libro ofrece una visión fascinante de la vida en la antigua Roma.',
//       genre: 'Historia, Aventuras'  
//     },

//   ];

//   hpBooks = [
//     {
//       title: 'Harry Potter y el Prisionero de Azkaban',
//       author: 'J.K. Rowling',
//       image: 'assets/hp-pa.jpeg',
//       rating: 4.7,
//       synopsis: 'En su tercer año en Hogwarts, Harry se enfrenta a una de las pruebas más peligrosas de su vida, cuando se entera de la verdad sobre Sirius Black.',
//       genre: 'Fantasía, Aventura'
//     },
//     {
//       title: 'Harry Potter y la Cámara Secreta',
//       author: 'J.K. Rowling',
//       image: 'assets/hp-cs.jpeg',
//       rating: 4.6,
//       synopsis: 'En su segundo año, Harry descubre un oscuro secreto en Hogwarts y debe enfrentarse a un gran peligro.',
//       genre: 'Fantasía, Aventura'
//     },
//     {
//       title: 'Harry Potter y el Cáliz de Fuego',
//       author: 'J.K. Rowling',
//       image: 'assets/hp-cf.jpeg',
//       rating: 4.8,
//       synopsis: 'En el cuarto año de Harry en Hogwarts, se enfrenta al peligroso Torneo de los Tres Magos mientras que Voldemort se acerca.',
//       genre: 'Fantasía, Aventura'
//     },
//     {
//       title: 'Harry Potter y el Prisionero de Azkaban',
//       author: 'J.K. Rowling',
//       image: 'assets/hp-pa.jpeg',
//       rating: 4.7,
//       synopsis: 'En su tercer año en Hogwarts, Harry se enfrenta a una de las pruebas más peligrosas de su vida, cuando se entera de la verdad sobre Sirius Black.',
//       genre: 'Fantasía, Aventura'
//     },
//     {
//       title: 'Harry Potter y la Cámara Secreta',
//       author: 'J.K. Rowling',
//       image: 'assets/hp-cs.jpeg',
//       rating: 4.6,
//       synopsis: 'En su segundo año, Harry descubre un oscuro secreto en Hogwarts y debe enfrentarse a un gran peligro.',
//       genre: 'Fantasía, Aventura'
//     },
//     {
//       title: 'Harry Potter y el Cáliz de Fuego',
//       author: 'J.K. Rowling',
//       image: 'assets/hp-cf.jpeg',
//       rating: 4.8,
//       synopsis: 'En el cuarto año de Harry en Hogwarts, se enfrenta al peligroso Torneo de los Tres Magos mientras que Voldemort se acerca.',
//       genre: 'Fantasía, Aventura'
//     },
//     {
//       title: 'Harry Potter y el Prisionero de Azkaban',
//       author: 'J.K. Rowling',
//       image: 'assets/hp-pa.jpeg',
//       rating: 4.7,
//       synopsis: 'En su tercer año en Hogwarts, Harry se enfrenta a una de las pruebas más peligrosas de su vida, cuando se entera de la verdad sobre Sirius Black.',
//       genre: 'Fantasía, Aventura'
//     },
//     {
//       title: 'Harry Potter y la Cámara Secreta',
//       author: 'J.K. Rowling',
//       image: 'assets/hp-cs.jpeg',
//       rating: 4.6,
//       synopsis: 'En su segundo año, Harry descubre un oscuro secreto en Hogwarts y debe enfrentarse a un gran peligro.',
//       genre: 'Fantasía, Aventura'
//     },
//     {
//       title: 'Harry Potter y el Cáliz de Fuego',
//       author: 'J.K. Rowling',
//       image: 'assets/hp-cf.jpeg',
//       rating: 4.8,
//       synopsis: 'En el cuarto año de Harry en Hogwarts, se enfrenta al peligroso Torneo de los Tres Magos mientras que Voldemort se acerca.',
//       genre: 'Fantasía, Aventura'
//     },
//   ];

  constructor(
    public dialog: MatDialog,
    private bookService: LibrosService,

  ) {}

  bookList:any[] = []

  filteredBooks:any = []

  ngOnInit(): void {
    this.bookService.getBooks(1).subscribe((rta: any) => {
      console.log("Libros Api: ", rta);
      this.bookList = rta.libros || [];
      this.filteredBooks = [...this.bookList]
    })
}

  openBookModal(book: any): void {
    this.dialog.open(BookModalComponent, {
      width: '500px',
      data: book
    }
    )
  }
}