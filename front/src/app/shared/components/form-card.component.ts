import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-card [style]="{ width: '30%', margin: '50px auto' }">
      <p-header class="flex justify-content-center align-content-center mb-0">
        <h1>{{ title }}</h1>
      </p-header>
      <ng-content select="[body]"></ng-content>
      <p-footer>
        <div class="flex justify-content-between">
          <ng-content select="[footer]"></ng-content>
        </div>
      </p-footer>
    </p-card>
  `,
})
export class FormCardComponent {
  @Input({ required: true }) title!: string;
}
