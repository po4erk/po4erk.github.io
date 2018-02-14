(function ($) {
    const config = {
        apiKey: "AIzaSyCTSrtpza1D_7tv0w82CV6cd6bqMabvGb8",
        authDomain: "test-po4erk.firebaseapp.com",
        databaseURL: "https://test-po4erk.firebaseio.com",
        projectId: "test-po4erk",
        storageBucket: "test-po4erk.appspot.com",
        messagingSenderId: "950069581603"
    };
    firebase.initializeApp(config);

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

        //Realisation button "Logout"
        this.logOut = function () {
            firebase.auth().signOut();
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

        //Authentification status tracking
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                firebaseUser.providerData.forEach(function (profile) {
                    console.log("Sign-in provider: " + profile.providerId);
                    console.log("Provider-specific UID: " + profile.uid);
                    console.log("Email: " + profile.email);
                });
                firebaseUser.getIdToken().then(function (accessToken) {
                    console.log("Access Token: " + accessToken);
                });
                console.log('If you did not come from the address po4erk91@gmail.com, you have read-only rights!');

                $('#content').load("js/tmpl/app.html", '', function () {
                    console.log("Load with login.");
                });
                
            } else {
                console.log('You are not logged in...');
                $('#content').load("tmpl/login.html", '', function () {
                    console.log("Load was performed.");
                });
            }
        });
    }

    //Button LogIn with email and pass
    $('#btnLogIn').on('click', e => {
        const email = $("#txtEmail").val();
        const pass = $("#txtPassword").val();
        authorization.logIn(email, pass);
    });

    //Button LogInAnon
    $('#btnLogInAnon').on('click', e => {
        authorization.logInAnon();
    });

    //Button LogInGoogle
    $('#btnLogInGoogle').on('click', e => {
        authorization.logInGoogle();
    });

    //Button SignIn with email and pass
    $('#btnSignUp').on('click', e => {
        const email = $("#txtEmail").val();
        const pass = $("#txtPassword").val();
        authorization.signUp(email, pass);
    });

})(jQuery); // End of use strict