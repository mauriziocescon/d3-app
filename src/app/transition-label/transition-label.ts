import * as d3 from "d3";

import {
    colorButton,
    helloLabel,
    transitionLabelComponent,
} from "./transition-label.scss";

export default class TransitionLabelComponent {
    public el: HTMLElement;

    protected label: HTMLElement;

    constructor() {
        this.render();
    }

    protected handleButtonExample(): void {
        this.changeLabelsBackgroundColor();
    }

    protected changeLabelsBackgroundColor(): void {
        d3.select(this.label)
            .transition()
            .duration(500)
            .style("color", this.randomColor());
    }

    protected randomColor(): string {
        const colors = ["purple", "blue", "green", "black", "orange", "pink"];
        const index = Math.round((Math.random() * 100) % colors.length);
        return colors[index];
    }

    protected render(): void {
        // Create external div
        this.el = document.createElement("div");
        this.el.classList.add(transitionLabelComponent);

        // Label
        this.label = document.createElement("div");
        this.label.classList.add(helloLabel);
        this.label.appendChild(document.createTextNode("Hello world!"));
        this.el.appendChild(this.label);

        // Button
        const button = document.createElement("button");
        button.classList.add(colorButton);
        button.appendChild(document.createTextNode("Change color"));
        button.addEventListener("click", this.handleButtonExample.bind(this));
        this.el.appendChild(button);
    }
}
