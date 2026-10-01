import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    imports: [],
    selector: 'app-chart-indicator',
    templateUrl: './chart-indicator.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './chart-indicator.component.scss'
})
export class ChartIndicatorComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) value: number = 0;
}
