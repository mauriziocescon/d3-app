import * as d3 from 'd3';

import * as styles from './bar-chart.scss';

export default class BarChartComponent {
  public el!: HTMLElement;

  protected barColor: string;
  protected barChart!: HTMLElement;

  constructor(barColor: string = '#4285f4') {
    this.barColor = barColor;

    this.render();
  }

  protected drawBarChart(): void {
    d3.select(this.barChart)
      .selectAll('div')
      .data([4, 8, 15, 16, 23, 42])
      .enter()
      .append('div')
      .style('background', this.barColor)
      .style('height', (d) => d * 5 + 'px');
  }

  protected render(): void {
    // Create external div
    this.el = document.createElement('div');
    this.el.classList.add(styles.barChartComponent);

    // Bootstrap card
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.marginBottom = '10px';
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    card.appendChild(cardBody);
    this.el.appendChild(card);

    // Card title
    const cardLabel = document.createElement('h4');
    cardLabel.classList.add('card-title');
    cardLabel.appendChild(document.createTextNode('d3.js test: draw a chart'));
    cardBody.appendChild(cardLabel);

    // BarChart
    this.barChart = document.createElement('div');
    this.barChart.classList.add(styles.barChart);
    cardBody.appendChild(this.barChart);

    // Draw BarChart
    this.drawBarChart();
  }
}
