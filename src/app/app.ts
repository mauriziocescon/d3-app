import { appComponent } from "./app.scss";

import BarChartComponent from "./bar-chart/bar-chart";
import NavigationBarComponent from "./navigation-bar/navigation-bar";
import TransitionLabelComponent from "./transition-label/transition-label";

export default class AppComponent {
    public el: HTMLElement;

    protected barChartComponent: BarChartComponent;
    protected navigationBarComponent: NavigationBarComponent;
    protected transitionLabelComponent: TransitionLabelComponent;

    constructor() {
        this.render();
    }

    protected render(): void {
        // Create external div
        this.el = document.createElement("div");
        this.el.classList.add(appComponent, "container-fluid");

        // NavigationBar
        this.navigationBarComponent = new NavigationBarComponent();
        this.el.appendChild(this.navigationBarComponent.el);

        let bootstrapRow = document.createElement("div");
        bootstrapRow.classList.add("row");
        this.el.appendChild(bootstrapRow);

        // Transition label
        this.transitionLabelComponent = new TransitionLabelComponent();
        this.transitionLabelComponent.el.classList.add("col-12", "col-md-6");
        bootstrapRow.appendChild(this.transitionLabelComponent.el);

        // Another Transition label
        const transitionLabelComponent = new TransitionLabelComponent();
        transitionLabelComponent.el.classList.add("col-12", "col-md-6");
        bootstrapRow.appendChild(transitionLabelComponent.el);

        bootstrapRow = document.createElement("div");
        bootstrapRow.classList.add("row");
        bootstrapRow.style.marginTop = "10px";
        this.el.appendChild(bootstrapRow);

        // BarChart
        this.barChartComponent = new BarChartComponent();
        this.barChartComponent.el.classList.add("col-12", "col-md-6");
        bootstrapRow.appendChild(this.barChartComponent.el);
    }
}
