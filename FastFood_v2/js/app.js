import { Router } from './router.js';
import { FireBaseService } from './services/firebase.js';
import { LoginService } from './services/login.js';

export class Application {
    constructor() {
        this.router = new Router();
        this.firebase = new FireBaseService();
        this.loginService = new LoginService();
    }

    init() {
        // initialize
        this.firebase.init();
        this.router.init();

        // handlers
        this.firebase.auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('If you did not come from the address po4erk91@gmail.com, you have read-only rights!');
                this.loginService.user = user;
            } else {
                console.log('You are not logged in...');
                this.router.navigate('login');
            }
        });
    }
}
