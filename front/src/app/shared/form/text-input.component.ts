import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-input-group [iconClasses]="iconClasses" [parentForm]="parentForm">
      <input
        pInputText
        [placeholder]="placeholder"
        [id]="htmlId"
        [type]="type"
        [name]="name"
        [formControlName]="controlName"
      />
    </app-input-group>
  `,
})
export class TextInputComponent {
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) htmlId!: string;
  @Input({ required: true }) iconClasses!: string;
  @Input({ required: false }) type = 'text';
  @Input({ required: false }) name!: string;
  @Input({ required: false }) controlName!: string;
  @Input({ required: false }) parentForm!: FormGroup;
}
