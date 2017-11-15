import AppComponent from "./app";

describe("AppComponent", () => {
    it("can instantiate an instance of AppComponent", () => {
        const appComponent = new AppComponent();
        expect(appComponent).toBeDefined();
    });
});
