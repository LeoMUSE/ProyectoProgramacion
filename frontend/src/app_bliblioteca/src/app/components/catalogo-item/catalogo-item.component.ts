import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-catalogo-item',
  templateUrl: './catalogo-item.component.html',
  styleUrl: './catalogo-item.component.css'
})
export class CatalogoItemComponent {
  @Input() book: any;

  @Output() actionEvent = new EventEmitter<{action: string, book: any}>();

  handleEditDelete(action: string) {
    this.actionEvent.emit({ action, book: this.book });
  }
}
