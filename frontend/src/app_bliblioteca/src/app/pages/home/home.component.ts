import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  books = [
    {
      title: 'El hombre y sus Símbolos',
      author: 'Carl Gustav Jung',
      image: 'assets/el-hombre.jpeg',
      rating: 4.5,
      modalToggle: 'modal',
      modalTarget: '#bookModal1'
    },
    {
      title: 'Violeta',
      author: 'Isabel Allende',
      image: 'assets/violeta.jpeg',
      rating: 4.5,
      modalToggle: 'modal',
      modalTarget: '#bookModal2'
    },
    {
      title: 'Roma soy yo',
      author: 'Santiago Posteguillo',
      image: 'assets/roma.jpeg',
      rating: 4.5,
      modalToggle: 'modal',
      modalTarget: '#bookModal3'
    },
    {
      title: 'El hombre y sus Símbolos',
      author: 'Carl Gustav Jung',
      image: 'assets/el-hombre.jpeg',
      rating: 4.5,
      modalToggle: 'modal',
      modalTarget: '#bookModal1'
    },
    {
      title: 'Violeta',
      author: 'Isabel Allende',
      image: 'assets/violeta.jpeg',
      rating: 4.5,
      modalToggle: 'modal',
      modalTarget: '#bookModal2'
    },
    {
      title: 'Roma soy yo',
      author: 'Santiago Posteguillo',
      image: 'assets/roma.jpeg',
      rating: 4.5,
      modalToggle: 'modal',
      modalTarget: '#bookModal3'
    },
    {
      title: 'El hombre y sus Símbolos',
      author: 'Carl Gustav Jung',
      image: 'assets/el-hombre.jpeg',
      rating: 4.5,
      modalToggle: 'modal',
      modalTarget: '#bookModal1'
    },

  ];

  hpBooks = [
    {
      title: 'Harry Potter y el Prisionero de Azkaban',
      author: 'J.K. Rowling',
      image: 'assets/hp-pa.jpeg',
      rating: 4.7,
      modalToggle: 'modal',
      modalTarget: '#bookModal-hp1'
    },
    {
      title: 'Harry Potter y la Cámara Secreta',
      author: 'J.K. Rowling',
      image: 'assets/hp-cs.jpeg',
      rating: 4.6,
      modalToggle: 'modal',
      modalTarget: '#bookModal-hp2'
    },
    {
      title: 'Harry Potter y el Cáliz de Fuego',
      author: 'J.K. Rowling',
      image: 'assets/hp-cf.jpeg',
      rating: 4.8,
      modalToggle: 'modal',
      modalTarget: '#bookModal-hp3'
    },
    {
      title: 'Harry Potter y el Prisionero de Azkaban',
      author: 'J.K. Rowling',
      image: 'assets/hp-pa.jpeg',
      rating: 4.7,
      modalToggle: 'modal',
      modalTarget: '#bookModal-hp1'
    },
    {
      title: 'Harry Potter y la Cámara Secreta',
      author: 'J.K. Rowling',
      image: 'assets/hp-cs.jpeg',
      rating: 4.6,
      modalToggle: 'modal',
      modalTarget: '#bookModal-hp2'
    },
    {
      title: 'Harry Potter y el Cáliz de Fuego',
      author: 'J.K. Rowling',
      image: 'assets/hp-cf.jpeg',
      rating: 4.8,
      modalToggle: 'modal',
      modalTarget: '#bookModal-hp3'
    },
    {
      title: 'Harry Potter y el Prisionero de Azkaban',
      author: 'J.K. Rowling',
      image: 'assets/hp-pa.jpeg',
      rating: 4.7,
      modalToggle: 'modal',
      modalTarget: '#bookModal-hp1'
    },
  ];
}
