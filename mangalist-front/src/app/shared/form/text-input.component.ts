import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-input-group [iconClasses]="iconClasses">
      <input
        pInputText
        [placeholder]="placeholder"
        [id]="htmlId"
        [type]="type"
      />
    </app-input-group>
  `,
})
export class TextInputComponent {
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) htmlId!: string;
  @Input({ required: true }) iconClasses!: string;
  @Input({ required: false }) type = 'text';
}
