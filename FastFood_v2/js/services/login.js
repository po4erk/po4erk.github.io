import { FireBaseService } from "./firebase";

let instance = null;

export class LoginService {
    constructor() {
        if (instance) return instance;

        this.user = null;
        this.firebase = new FireBaseService();

        instance = this;
    }

    logInGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();

        this.firebase.auth.signInWithPopup(provider);
    }

    logInAnon() {
        this.firebase.auth.signInAnonymously().then(function () {
            console.log("You are logged in anonymously.");
        });
    }

    logIn(email, pass) {
        this.firebase.auth.signInWithEmailAndPassword(email, pass).then(function () {
            console.log("You are logged in.");
        }).catch(function (error) {
            if((email == null) || (pass == null)) {
                alert('Enter any login data!');
            } else {
                alert('Sign Up please!');
            }
        });
    }

    signUp(email, pass) {
        this.firebase.auth.createUserWithEmailAndPassword(email, pass).then(function () {
            alert('Thank you for registrations!');
        });
    }
}