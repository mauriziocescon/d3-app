import "./app.scss";

import BarChartComponent from "./bar-chart/bar-chart";
import TransitionLabelComponent from "./transition-label/transition-label";

export default class AppComponent {
    public el: HTMLElement;

    protected barChartComponent: BarChartComponent;
    protected transitionLabelComponent: TransitionLabelComponent;

    constructor() {
        this.render();
    }

    protected render(): void {
        // Create external div
        this.el = document.createElement("div");
        this.el.classList.add("app-component");

        // Transition label
        this.transitionLabelComponent = new TransitionLabelComponent();
        this.el.appendChild(this.transitionLabelComponent.el);

        // Another Transition label
        this.transitionLabelComponent = new TransitionLabelComponent();
        this.el.appendChild(this.transitionLabelComponent.el);

        // BarChart
        this.barChartComponent = new BarChartComponent();
        this.el.appendChild(this.barChartComponent.el);
    }
}
