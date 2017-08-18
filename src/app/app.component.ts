import template from "./app.component.html";
import "./app.component.scss";

export default class AppComponent {
    public element: any;

    constructor() {
        this.element = template;
    }
}
