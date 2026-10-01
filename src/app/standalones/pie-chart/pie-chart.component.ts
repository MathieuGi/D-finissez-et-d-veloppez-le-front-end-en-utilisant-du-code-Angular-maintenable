import { Component, Input, OnInit, output, ChangeDetectionStrategy } from '@angular/core';
import { Chart, ChartEvent, ActiveElement } from 'chart.js/auto';

@Component({
    selector: 'app-pie-chart',
    imports: [],
    templateUrl: './pie-chart.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) labels: string[] = [];
  @Input({ required: true }) label: string = '';
  @Input({ required: true }) data: number[] = [];
  elementClick = output<number>();

  public pieChart!: Chart<'pie', number[], string>;

  ngOnInit() {
    const pieChart = new Chart(this.title, {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: this.label,
            data: this.data,
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
        aspectRatio: 2.5,
        onClick: (e) => {
          if (e.native && this.elementClick) {
            const points = pieChart.getElementsAtEventForMode(
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
    this.pieChart = pieChart;
  }
}
