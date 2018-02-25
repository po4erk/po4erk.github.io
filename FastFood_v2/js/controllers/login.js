import { BaseController } from "./base";
import { LoginView } from "../views/login";
import { LoginService } from "../services/login";
import { Router } from "../router";
import { FireBaseService } from "../services/firebase";

export class LoginController extends BaseController {
    constructor() {
        super();

        if (new LoginService().user) {
            new Router().navigate('home');
        }

        new FireBaseService().auth.onAuthStateChanged((user) => {
            if (user) new Router().navigate('home');
        });

        this.name = 'login';
        this.view = new LoginView();
    }
}