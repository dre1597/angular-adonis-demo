import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-card [style]="{ width: '30%', margin: '50px auto' }">
      <p-header class="header">
        <h1 class="header">{{ title }}</h1>
      </p-header>
      <ng-content select="[body]"></ng-content>
      <p-footer>
        <div class="flex justify-between">
          <ng-content select="[footer]"></ng-content>
        </div>
      </p-footer>
    </p-card>
  `,
  styles: [
    `
      .header {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0;
      }
    `,
  ],
})
export class FormCardComponent {
  @Input({ required: true }) title!: string;
}
