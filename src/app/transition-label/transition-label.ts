import * as d3 from "d3";

import * as styles from "./transition-label.scss";

export default class TransitionLabelComponent {
    public el: HTMLElement;

    protected cardLabel: HTMLElement;

    constructor() {
        this.render();
    }

    protected handleButtonExample(): void {
        this.changeLabelsBackgroundColor();
    }

    protected changeLabelsBackgroundColor(): void {
        d3.select(this.cardLabel)
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
        this.el.classList.add(styles.transitionLabelComponent);

        // Bootstrap card
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.marginBottom = "10px";
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        card.appendChild(cardBody);
        this.el.appendChild(card);

        // Card title
        this.cardLabel = document.createElement("h4");
        this.cardLabel.classList.add(styles.helloLabel, "card-title");
        this.cardLabel.appendChild(document.createTextNode("d3.js test: style transition"));
        cardBody.appendChild(this.cardLabel);

        // Card description
        const cardDescription = document.createElement("p");
        cardDescription.classList.add("card-text");
        cardDescription.appendChild(document.createTextNode("Click the button in order to change the color"));
        cardBody.appendChild(cardDescription);

        // Card button
        const button = document.createElement("a");
        button.classList.add("btn", "btn-primary");
        button.appendChild(document.createTextNode("Change color"));

        // Card button font awesome
        const fa = document.createElement("span");
        fa.classList.add("fa", "fa-adjust");
        fa.style.marginLeft = "10px";
        button.appendChild(fa);

        button.addEventListener("click", this.handleButtonExample.bind(this));
        cardBody.appendChild(button);
    }
}
