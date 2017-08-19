import AppComponent from "./app/app";

class Main {
    public static app: AppComponent;
    public static rootEl: HTMLElement;

    public static appReady(): void {
        Main.loadApp();
    }

    protected static loadApp(): void {
        // Get a reference for the app content
        this.rootEl = document.getElementById("root");

        // Create appComponent
        this.app = new AppComponent();

        // Append appComponent element to the DOM
        this.rootEl.appendChild(this.app.el);
    }
}

document.addEventListener("DOMContentLoaded", Main.appReady.bind(Main));
