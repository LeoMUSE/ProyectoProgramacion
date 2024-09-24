import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-option-button',
  templateUrl: './option-button.component.html',
  styleUrl: './option-button.component.css'
})
export class OptionButtonComponent {
  @Input() label: string = '';
  @Input() link: string = '#';
}
