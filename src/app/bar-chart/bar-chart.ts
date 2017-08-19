import * as d3 from "d3";

import "./bar-chart.scss";

export default class BarChartComponent {
    public el: HTMLElement;

    protected barChart: HTMLElement;

    constructor() {
        this.render();
    }

    protected drawBarChart(): void {
        d3.select(this.barChart)
            .selectAll("div")
            .data([4, 8, 15, 16, 23, 42])
            .enter()
            .append("div")
            .style("height", (d) => d + "px");
    }

    protected render(): void {
        // Create external div
        this.el = document.createElement("div");
        this.el.classList.add("bar-chart-component");

        // BarChart
        this.barChart = document.createElement("div");
        this.barChart.classList.add("bar-chart");
        this.el.appendChild(this.barChart);

        // Draw BarChart
        this.drawBarChart();
    }
}
