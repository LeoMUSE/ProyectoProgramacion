import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbmModalComponent } from '../../components/modals/abm-modal/abm-modal.component';
import { LibrosService } from '../../services/books/libros.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit{

  constructor(
    private dialog: MatDialog,
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
  
handleActionEvent(event: { action: string, book: any }) {
  if (event.action === 'edit') {
    this.openABMbookModal(event.book, 'edit');
  } else if (event.action === 'delete') {
    this.bookService.deleteBook(event.book.id).subscribe({
      next: () => {
        console.log('Libro eliminado con éxito');
        this.refreshBookList();
      },
      error: (err) => {
        console.error('Error al eliminar el libro', err)
      }
    })
  }
}

  openABMbookModal(bookData: any, operation: string): void {
    const dialogRef = this.dialog.open(AbmModalComponent, {
      width: '500px',
      data: {
        formType: 'book',
        formOperation: operation,
        ...bookData
      } 
    });
    dialogRef.afterClosed().subscribe( result => {
      console.log('El modal se cerro', result);
      
      if(result) {
        if (operation == 'create') {
          this.bookService.postBook(result).subscribe(() => {
            this.refreshBookList();
          });
        } else if (operation === 'edit') {
          this.bookService.updateBook(bookData.id, result).subscribe(() => {
            this.refreshBookList();
          })
        }
      }
    });
  }
  
  refreshBookList(): void {
    this.bookService.getBooks(1).subscribe((rta: any) => {
      console.log("Libros api: ", rta);
      this.bookList = rta.libros || [];
      this.filteredBook = [...this.bookList];
    })
  }
}
