import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-catalogo-item',
  templateUrl: './catalogo-item.component.html',
  styleUrl: './catalogo-item.component.css'
})
export class CatalogoItemComponent {
  @Input() book: any;
}
