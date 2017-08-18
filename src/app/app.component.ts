import template from "./app.component.html";
import "./app.component.scss";

import * as d3 from "d3";

export default class AppComponent {
    public html: any;

    constructor() {
        this.html = template;
    }

    public setupComponent(): void {
        const buttonExample = document.getElementById("app-change-color");
        buttonExample.addEventListener("click", this.handleButtonExample.bind(this));

        this.drawBarChart();
    }

    protected drawBarChart(): void {
        d3.select("#app-barchart")
            .selectAll("div")
            .data([4, 8, 15, 16, 23, 42])
            .enter()
            .append("div")
            .style("height", (d) => d + "px");
    }

    protected handleButtonExample(): void {
        this.changeLabelsBackgroundColor();
    }

    protected changeLabelsBackgroundColor(): void {
        d3.selectAll(".hello-label")
            .transition()
            .duration(700)
            .style("color", this.randomColor());
    }

    private randomColor(): string {
        const index = Math.round((Math.random() * 100) % 3);
        return ["purple", "blue", "green"][index];
    }
}
