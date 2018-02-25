import { LoginService } from "../services/login";
import { View } from "./base";

export class LoginView extends View {
    constructor() {
        super();
        
        this.loginService = new LoginService();
    }

    init() {
        $('#btnLogIn').on('click', () => {
            const email = $("#txtEmail").val();
            const pass = $("#txtPassword").val();
            this.loginService.logIn(email, pass);
        });

        $('#btnLogInAnon').on('click', () => {
            console.log('anon');
            this.loginService.logInAnon();
        });

        $('#btnLogInGoogle').on('click', () => {
            this.loginService.logInGoogle();
        });

        $('#btnSignUp').on('click', () => {
            const email = $("#txtEmail").val();
            const pass = $("#txtPassword").val();
            this.loginService.signUp(email, pass);
        });
    }
}