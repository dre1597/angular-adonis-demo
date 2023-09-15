import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  template: `
    <input
      pInputText
      [placeholder]="placeholder"
      [id]="htmlId"
      [type]="type"
      [name]="name"
      [formControlName]="controlName"
    />
  `,
})
export class TextInputComponent {
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) htmlId!: string;
  @Input({ required: false }) type = 'text';
  @Input({ required: false }) name!: string;
  @Input({ required: false }) controlName!: string;
  @Input({ required: false }) parentForm!: FormGroup;
}
