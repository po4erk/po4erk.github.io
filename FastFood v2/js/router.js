import { LoginController } from "./controllers/login";

let instance = null;

export class Router {
    constructor() {
        if (instance) { return instance; }

        this.router = new Navigo(null, true, '#');

        instance = this;
    }

    init() {
        this.router.on({
            'login': () => new LoginController(),
            'list': () => {}
        })
        .resolve();
    }
}