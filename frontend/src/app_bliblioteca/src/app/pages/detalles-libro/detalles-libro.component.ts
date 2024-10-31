import { Component, Input, OnInit } from '@angular/core';
import { LibrosService } from '../../services/books/libros.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestamosService } from '../../services/loans/prestamos.service';
import { ReseñasService } from '../../services/reviews/reseñas.service';

@Component({
  selector: 'app-detalles-libro',
  templateUrl: './detalles-libro.component.html',
  styleUrl: './detalles-libro.component.css'
})
export class DetallesLibroComponent implements OnInit{
  book: any; 
  reviews: any[] = [];

  constructor(
    private bookService: LibrosService,
    private loanService: PrestamosService,
    private reviewService: ReseñasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');

    if (bookId) {
      this.bookService.getBooksById(Number(bookId)).subscribe(
        (data) => {
          this.book = data;
          this.getBookReviews(Number(bookId));
        },
        (error) => {
          console.log('Error al obtener los detalles del libro: ', error);
        }
      );
    }
  }

  getBookReviews(id: number): void {
    const params = { idLibro: this.book.id };
    this.reviewService.getReviews(1, params).subscribe(
      (reviewsResponse) => {
        this.reviews = (reviewsResponse as any).reseñas;
      },
      (error) => {
        console.error('Error al obtener las reseñas del libro: ', error);
      }
    );
  }

  solicitarPrestamo(): void {
    const tokenUserId = localStorage.getItem('user_id');
    const fechaActual = new Date();
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const anio = fechaActual.getFullYear();
    const inicioPrestamo = `${dia}-${mes}-${anio}`;
    
    // Calcular la fecha de fin de préstamo (1 mes después)
    const fechaFin = new Date(fechaActual);
    fechaFin.setMonth(fechaFin.getMonth() + 1);
    const diaFin = String(fechaFin.getDate()).padStart(2, '0');
    const mesFin = String(fechaFin.getMonth() + 1).padStart(2, '0');
    const anioFin = fechaFin.getFullYear();
    const finPrestamo = `${diaFin}-${mesFin}-${anioFin}`;

    const prestamoData = {
      usuario: tokenUserId,
      libro: [this.book.id], 
      inicio_prestamo: inicioPrestamo,
      fin_prestamo: finPrestamo,
      estado: 'Pendiente' 
    };

    this.loanService.postLoan(prestamoData).subscribe(
      response => {
        console.log('Préstamo solicitado con éxito:', response);
      },
      error => {
        console.error('Error al solicitar el préstamo:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/search']);
  }
}
