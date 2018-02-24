(function ($) {
    const authorization = new Authentifications();

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log('If you did not come from the address po4erk91@gmail.com, you have read-only rights!');
            window.location.href = '#!app';
        } else {
            console.log('You are not logged in...');
            window.location.href = '#!login';
        }
    });

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
                if((email == null)||(pass==null)){
                    alert('Enter any login data!');
                }else{
                    alert('Sign Up please!');
                }
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


})(jQuery);