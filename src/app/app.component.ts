import template from "./app.component.html";
import "./app.component.scss";

import * as d3 from "d3";

export default class AppComponent {
    public html: any;

    constructor() {
        this.html = template;
    }

    public setupComponent(): void {
        const buttonExample = document.getElementById("app.color");
        buttonExample.addEventListener("click", this.handleButtonExample.bind(this));
    }

    protected handleButtonExample(): void {
        this.changeLabelsBackgroundColor();
    }

    protected changeLabelsBackgroundColor(): void {
       const elements = d3.selectAll(".hello-label")
           .transition()
           .duration(300);
       elements.style("color", this.randomColor());
    }

    private randomColor(): string {
        const index = Math.round((Math.random() * 100) % 3);
        return ["purple", "blue", "green"][index];
    }
}
