import * as d3 from "d3";

import {
    barChart,
    barChartComponent,
} from "./bar-chart.scss";

export default class BarChartComponent {
    public el: HTMLElement;

    protected barColor: string;
    protected barChart: HTMLElement;

    constructor(barColor: string = "#4285f4") {
        this.barColor = barColor;

        this.render();

        // tslint:disable-next-line
        console.log(barChart + " " + barChartComponent);
    }

    protected drawBarChart(): void {
        d3.select(this.barChart)
            .selectAll("div")
            .data([4, 8, 15, 16, 23, 42])
            .enter()
            .append("div")
            .style("background", this.barColor)
            .style("height", (d) => d * 5 + "px");
    }

    protected render(): void {
        // Create external div
        this.el = document.createElement("div");
        this.el.classList.add(barChartComponent, "container-fluid");

        // BarChart
        this.barChart = document.createElement("div");
        this.barChart.classList.add(barChart);
        this.el.appendChild(this.barChart);

        // Draw BarChart
        this.drawBarChart();
    }
}
