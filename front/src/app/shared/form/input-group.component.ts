import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-inputgroup" [formGroup]="parentForm">
      <span [style]="{ color: '#fff' }" class="p-inputgroup-addon">
        <i [class]="iconClasses"></i>
      </span>
      <ng-content></ng-content>
    </div>
  `,
})
export class InputGroupComponent {
  @Input({ required: true }) iconClasses!: string;
  @Input({ required: false }) parentForm!: FormGroup;
}
