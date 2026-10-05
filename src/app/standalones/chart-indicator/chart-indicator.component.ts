import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-chart-indicator',
  templateUrl: './chart-indicator.component.html',
  styleUrl: './chart-indicator.component.scss',
})
export class ChartIndicatorComponent {
  title = input.required<string>();
  value = input.required<number>();
}
