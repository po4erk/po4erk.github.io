import { Router } from './router.js';
// import { DB } from './db.js';

class Application {
    constructor() {
        this.router = new Router();
        // this.db = new DB();
    }

    init() {
        this.router.init();
        // this.db.init();
    }
}

const app = new Application();
app.init();