import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-password-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-input-group iconClasses="pi pi-lock">
      <input
        pPassword
        [placeholder]="placeholder"
        [id]="htmlId"
        type="password"
      />
    </app-input-group>
  `,
})
export class PasswordInputComponent {
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) htmlId!: string;
}
