import { LoginController } from "./controllers/login";
import { HomeController } from "./controllers/home";

let instance = null;

export class Router {
    constructor() {
        if (instance) { return instance; }

        this.router = new Navigo(null, true, '#');

        instance = this;
    }

    init() {
        this.router.on({
            'home': () => new HomeController().load(),
            'login': () => new LoginController().load()
        })
        .resolve();
    }

    navigate(url) {
        this.router.navigate(url);
    } 
}
