import {Authentifications} from './login';

export class AuthView{

    constructor(){
        this.authorization = new Authentifications();
    }

    init(){
        //Button LogIn with email and pass
        $('#btnLogIn').on('click', (e) => {
            const email = $("#txtEmail").val();
            const pass = $("#txtPassword").val();
            this.authorization.logIn(email, pass);
        });

        //Button LogInAnon
        $('#btnLogInAnon').on('click', (e) => {
            this.authorization.logInAnon();
        });

        //Button LogInGoogle
        $('#btnLogInGoogle').on('click', (e) => {
            this.authorization.logInGoogle();
        });

        //Button SignIn with email and pass
        $('#btnSignUp').on('click', (e) => {
            const email = $("#txtEmail").val();
            const pass = $("#txtPassword").val();
            this.authorization.signUp(email, pass);
        });
    }
}