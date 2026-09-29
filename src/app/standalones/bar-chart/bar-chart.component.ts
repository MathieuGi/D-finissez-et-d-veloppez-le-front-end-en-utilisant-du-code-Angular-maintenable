import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent implements OnInit {
  @Input({ required: true }) labels!: number[];
  @Input({ required: true }) data!: string[];

  lineChart!: Chart<'bar', string[], number>;

  ngOnInit() {
    const lineChart = new Chart('countryChart', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            barPercentage: 0.4,
            label: 'medals',
            data: this.data,
            backgroundColor: '#0b868f',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
    this.lineChart = lineChart;
  }
}
