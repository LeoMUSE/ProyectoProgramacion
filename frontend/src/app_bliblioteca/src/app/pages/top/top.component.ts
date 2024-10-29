import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../../services/books/libros.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrl: './top.component.css'
})
export class TopComponent implements OnInit{
  // topBooks = [
  //   {
  //     title: 'El señor de los Anillos',
  //     author: 'J.R.R. Tolkien',
  //     synopsis: 'Una épica de J.R.R. Tolkien donde Frodo Bolsón y sus compañeros intentan destruir un anillo maldito para salvar al mundo de la oscuridad.',
  //     image: 'assets/señor_d_a.jpeg',
  //     rating: 5,
  //     reviews: 392,
  //     rank: 1
  //   },
  //   {
  //     title: 'El Código Da Vinci',
  //     author: 'Dan Brown',
  //     synopsis: 'Un thriller en el que un profesor de simbología investiga un asesinato en el Louvre y descubre un misterio que podría cambiar la historia.',
  //     image: 'assets/codigo_d.jpeg',
  //     rating: 5,
  //     reviews: 235,
  //     rank:2
  //   },
  //   {
  //     title: 'Alicia en el País de Las Maravillas',
  //     author: 'Lewis Carroll',
  //     synopsis: 'Una joven llamada Alicia cae en un mundo fantástico lleno de personajes y situaciones absurdas, donde vive una serie de aventuras surrealistas.',
  //     image: 'assets/alicia.jpeg',
  //     rating: 5,
  //     reviews: 281,
  //     rank:3
  //   },
  // ];

  constructor(
    private bookService: LibrosService,
  ) {}

  bookList:any[] = []
  filteredBook:any = []

  ngOnInit(): void {
    this.bookService.getBooks(1).subscribe((rta: any) => {
      console.log("Libros Api: ", rta);
      this.bookList = rta.libros || [];
      this.filteredBook = [...this.bookList]
    })
}
}
