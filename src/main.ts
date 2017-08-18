import AppComponent from "./app/app.component";

class Main {
    public static appComponent: AppComponent;
    public static rootElement: HTMLElement;

    public static appReady(): void {
        Main.loadApp();
    }

    protected static loadApp(): void {
        // Get a reference for the app content
        this.rootElement = document.getElementById("root");

        // Create appComponent
        this.appComponent = new AppComponent();

        // Append the masonry gallery element to the DOM
        this.rootElement.insertAdjacentHTML("afterbegin", this.appComponent.html);
        this.appComponent.setupComponent();
    }
}

document.addEventListener("DOMContentLoaded", Main.appReady.bind(Main));
