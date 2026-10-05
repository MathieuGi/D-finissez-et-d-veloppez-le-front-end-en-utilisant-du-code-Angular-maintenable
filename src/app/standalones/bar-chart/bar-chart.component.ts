import { Component, computed, input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent {
  title = input<string>('barChart');
  labels = input.required<number[]>();
  label = input.required<string>();
  data = input.required<string[]>();

  lineChart = computed<Chart<'bar', string[], number>>(() => {
    return new Chart(this.title(), {
      type: 'bar',
      data: {
        labels: this.labels(),
        datasets: [
          {
            barPercentage: 0.4,
            label: this.label(),
            data: this.data(),
            backgroundColor: '#0b868f',
          },
        ],
      },
    });
  });

  buildChart(): Chart<'bar', string[], number> {
    return new Chart(this.title(), {
      type: 'bar',
      data: {
        labels: this.labels(),
        datasets: [
          {
            barPercentage: 0.4,
            label: this.label(),
            data: this.data(),
            backgroundColor: '#0b868f',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
