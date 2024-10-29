import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PrestamosService } from '../../../services/loans/prestamos.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrl: './book-modal.component.css'
})
export class BookModalComponent {
  constructor(
    public dialogRef: MatDialogRef<BookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loanService: PrestamosService,
    private authService: AuthService // Servicio para manejar la autenticación
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }

  solicitarPrestamo(): void {
    const tokenUserId = localStorage.getItem('user_id')
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
      libro: [this.data.id], 
      inicio_prestamo: inicioPrestamo,
      fin_prestamo: finPrestamo,
      estado: 'Pendiente' 
    };

    this.loanService.postLoan(prestamoData).subscribe(
      response => {
        console.log('Préstamo solicitado con éxito:', response);
        this.dialogRef.close(); 
      },
      error => {
        console.error('Error al solicitar el préstamo:', error);
      }
    );
  }
}