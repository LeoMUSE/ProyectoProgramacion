import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-loan-item',
  templateUrl: './loan-item.component.html',
  styleUrl: './loan-item.component.css'
})
export class LoanItemComponent {
  @Input() loan: any; //prestamo como objeto
  @Input() id: string = '';
  @Input() rol: string = 'user';
}
