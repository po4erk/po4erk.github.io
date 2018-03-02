import {Firebase} from './firebase'

    class Authentifications{
        constructor(){
            this.firebase = new Firebase();
        }


        logInGoogle() {
            let provider = new firebase.auth.GoogleAuthProvider();
            this.firebase.auth.signInWithPopup(provider);
        }

        logInAnon() {
            this.firebase.auth.signInAnonymously().then(function () {
                console.log("You are logged in anonymously.");
            });
        }
        //Realisation button "Login"
        logIn(email, pass) {
            this.email = email;
            this.pass = pass;
            this.firebase.auth.signInWithEmailAndPassword(email, pass).then(function () {
                console.log("You are logged in.");
            }).catch(function (error) {
                if((email == null)||(pass==null)){
                    alert('Enter any login data!');
                }else{
                    alert('Sign Up please!');
                }
            });
        }

        //Realisation button "Sign Up"
        signUp(email, pass) {
            this.email = email;
            this.pass = pass;
            this.firebase.auth.createUserWithEmailAndPassword(email, pass).then(function () {
                alert('Thank you for registrations!');
            });
        }

    }
    const authorization = new Authentifications();

    export class AuthView{

        init(){
            //Button LogIn with email and pass
            $(document).on('click','#btnLogIn', function(e) {
                const email = $("#txtEmail").val();
                const pass = $("#txtPassword").val();
                authorization.logIn(email, pass);
            });

            //Button LogInAnon
            $(document).on('click','#btnLogInAnon', function(e) {
                console.log('anon');
                authorization.logInAnon();
            });

            //Button LogInGoogle
            $(document).on('click','#btnLogInGoogle', function(e) {
                authorization.logInGoogle();
            });

            //Button SignIn with email and pass
            $(document).on('click','#btnSignUp', function(e) {
                const email = $("#txtEmail").val();
                const pass = $("#txtPassword").val();
                authorization.signUp(email, pass);
            });
        }
    }
