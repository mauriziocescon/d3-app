import template from "./app.component.html";
import "./app.component.scss";

export default class AppComponent {
    public html: any;

    constructor() {
        this.html = template;
    }

    public setupViews(): void {
        const buttonExample = document.getElementById("example");
        buttonExample.addEventListener("click", this.handleButtonExample.bind(this));
    }

    protected handleButtonExample(): void {
        alert("Hello world!!");
    }
}
