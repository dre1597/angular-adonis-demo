import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-inputgroup">
      <span [style]="{ color: '#fff' }" class="p-inputgroup-addon">
        <i [class]="iconClasses"></i>
      </span>
      <ng-content></ng-content>
    </div>
  `,
})
export class InputGroupComponent {
  @Input({ required: true }) iconClasses!: string;
}
