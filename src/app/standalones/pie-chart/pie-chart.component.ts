import { Component, output, input, computed } from '@angular/core';
import { Chart, ChartEvent, ActiveElement } from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent {
  title = input<string>('pieChart');
  labels = input.required<string[]>();
  label = input.required<string>();
  data = input.required<number[]>();

  elementClick = output<number>();

  // Pourquoi ça ne fonctionne pas avec cette notation :  computed<Chart<'pie', number[], string>>(this.buildChart);
  pieChart = computed<Chart<'pie', number[], string>>(() => this.buildChart());

  buildChart(): Chart<'pie', number[], string> {
    return new Chart(this.title(), {
      type: 'pie',
      data: {
        labels: this.labels(),
        datasets: [
          {
            label: this.label(),
            data: this.data(),
            backgroundColor: [
              '#0b868f',
              '#adc3de',
              '#7a3c53',
              '#8f6263',
              'orange',
              '#94819d',
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        onClick: (e) => {
          if (e.native && this.elementClick) {
            const points = this.pieChart().getElementsAtEventForMode(
              e.native,
              'point',
              { intersect: true },
              true,
            );
            if (points.length && this.elementClick) {
              const firstPoint = points[0];
              this.elementClick.emit(firstPoint.index);
            }
          }
        },
        onHover: (
          event: ChartEvent,
          chartElement: ActiveElement[],
          chart: Chart,
        ) => {
          chartElement.length > 0
            ? (chart.canvas.style.cursor = 'pointer')
            : (chart.canvas.style.cursor = 'default');
        },
      },
    });
  }
}
