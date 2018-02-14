(function ($) {
    const authorization = new Authentifications();

    function Authentifications() {

        this.logInGoogle = function () {
            const auth = firebase.auth();
            let provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider);
        }

        this.logInAnon = function () {
            const auth = firebase.auth();
            auth.signInAnonymously().then(function () {
                console.log("You are logged in anonymously.");
            });
        }
        //Realisation button "Login"
        this.logIn = function (email, pass) {
            this.email = email;
            this.pass = pass;
            const auth = firebase.auth();
            auth.signInWithEmailAndPassword(email, pass).then(function () {
                console.log("You are logged in.");
            }).catch(function (error) {
                alert('Sign Up please!');
            });
        }

        //Realisation button "Sign Up"
        this.signUp = function (email, pass) {
            this.email = email;
            this.pass = pass;
            const auth = firebase.auth();
            auth.createUserWithEmailAndPassword(email, pass).then(function () {
                alert('Thank you for registrations!');
            });
        }

    }

    //Button LogIn with email and pass
    $('#btnLogIn').on('click','a', function(e) {
        const email = $("#txtEmail").val();
        const pass = $("#txtPassword").val();
        authorization.logIn(email, pass);
    });

    //Button LogInAnon
    $('#btnLogInAnon').on('click','a', function(e) {
        console.log('anon');
        authorization.logInAnon();
    });

    //Button LogInGoogle
    $('#btnLogInGoogle').on('click','a', function(e) {
        authorization.logInGoogle();
    });

    //Button SignIn with email and pass
    $('#btnSignUp').on('click','a', function(e) {
        const email = $("#txtEmail").val();
        const pass = $("#txtPassword").val();
        authorization.signUp(email, pass);
    });

})(jQuery); // End of use strict