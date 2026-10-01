import { Component, Input } from '@angular/core';

@Component({
    imports: [],
    selector: 'app-chart-indicator',
    templateUrl: './chart-indicator.component.html',
    styleUrl: './chart-indicator.component.scss'
})
export class ChartIndicatorComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) value: number = 0;
}
