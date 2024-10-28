import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReseñasService } from '../../../../services/reviews/reseñas.service';

@Component({
  selector: 'app-crear-resena',
  templateUrl: './crear-resena.component.html',
  styleUrl: './crear-resena.component.css'
})
export class CrearResenaComponent {
  formResena!: FormGroup;
  rating: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private reviewService: ReseñasService,
    public dialogRef: MatDialogRef<CrearResenaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formResena = this.formBuilder.group({
      descripcion: ['', Validators.required],
      rating: [0, Validators.required]
    });
  }

  setRating(stars: number): void {
    this.rating = stars;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  saveChanges(): void {
    if (this.formResena.valid) {
        const fechaActual = new Date();
        const dia = String(fechaActual.getDate()).padStart(2, '0'); 
        const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); 
        const anio = fechaActual.getFullYear();

        const formData = {
            descripcion: this.formResena.value.descripcion,
            fecha: `${dia}-${mes}-${anio}`, // Formato 'dd-mm-aaaa'
            valoracion: `${this.rating}/5`,
            libro: this.data.loan.libro[0].id,
            usuario: this.data.loan.usuario.id
        };

        console.log('Datos del formulario: ', formData);
        
        // Llama al servicio para guardar la reseña
        this.reviewService.postReview(formData).subscribe(
            response => {
                console.log('Reseña guardada con éxito:', response);
                this.dialogRef.close(formData);
            },
            error => {
                console.error('Error al guardar la reseña:', error);
            }
        );
    }
}

  getValoracionAsNumber(review: any): number {
    return parseInt(review.valoracion) || 0; // Convierte a número o retorna 0 si no es válido
  }
}
