import { Component } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  reviews = [
    {
      bookImg: 'assets/el-hombre.jpeg',
      bookTitle: 'El Hombre y sus Símbolos',
      userImg: 'assets/EmmaCeleron.png',
      username: 'EmCalde.',
      comment: 'Muy buen libro, lo recomiendo.',
      rating: 5
    },
    {
      bookImg: 'assets/el-hombre.jpeg',
      bookTitle: 'El Hombre y sus Símbolos',
      userImg: 'assets/EmmaCeleron.png',
      username: 'JuanaP.',
      comment: 'Interesante perspectiva sobre los símbolos.',
      rating: 4
    },
    {
      bookImg: 'assets/el-hombre.jpeg',
      bookTitle: 'El Hombre y sus Símbolos',
      userImg: 'assets/EmmaCeleron.png',
      username: 'CarlosR.',
      comment: 'Me encantó el enfoque del autor.',
      rating: 5
    },
    {
      bookImg: 'assets/el-hombre.jpeg',
      bookTitle: 'El Hombre y sus Símbolos',
      userImg: 'assets/EmmaCeleron.png',
      username: 'AnaM.',
      comment: 'Un libro que invita a reflexionar.',
      rating: 4
    },
    {
      bookImg: 'assets/el-hombre.jpeg',
      bookTitle: 'El Hombre y sus Símbolos',
      userImg: 'assets/EmmaCeleron.png',
      username: 'PedroF.',
      comment: 'Lo encontré un poco denso en algunas partes.',
      rating: 3
    }
  ];
}
