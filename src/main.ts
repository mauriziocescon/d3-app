import AppComponent from "./app/app.component";

class Main {
    public static appComponent: any;
    public static siteContent: any;

    public static appReady(): void {
        Main.loadApp();
    }

    protected static loadApp(): void {
        // Setup appComponent
        this.appComponent = new AppComponent();

        // Get a reference for the app content
        this.siteContent = document.getElementById("root");

        // Append the masonry gallery element to the DOM
        this.siteContent.insertAdjacentHTML("afterbegin", this.appComponent.element);
    }
}

document.addEventListener("DOMContentLoaded", Main.appReady.bind(Main));
