import {Firebase} from './firebase';
import {Router} from './routing';

export class Authentifications{
    constructor(){
        this.firebase = new Firebase();
        this.router = new Router();
    }


    logInGoogle() {
        let provider = new firebase.auth.GoogleAuthProvider();
        this.firebase.auth.signInWithPopup(provider)
        .then(() => this.router.navigate('app'));
    }

    logInAnon() {
        this.firebase.auth.signInAnonymously().then(() => {
            console.log("You are logged in anonymously.");
            this.router.navigate('app');
        });
    }
    //Realisation button "Login"
    logIn(email, pass) {
        this.email = email;
        this.pass = pass;
        this.firebase.auth.signInWithEmailAndPassword(email, pass).then(() => {
            console.log("You are logged in.");
            this.router.navigate('app');
        }).catch(function (error) {
            if((email == "")||(pass == "")){
                dialog.alert({
                    title: "Sorry!",
                    message: "Enter any login data!"
                });
            }else{
                dialog.alert({
                    title: "Sorry!",
                    message: "Sign Up please!"
                });
            }
        });
    }

    //Realisation button "Sign Up"
    signUp(email, pass) {
        this.email = email;
        this.pass = pass;
        this.firebase.auth.createUserWithEmailAndPassword(email, pass).then(() => {
            dialog.alert({
                title: "Thanks!",
                message: "Thanks for registration!"
            });
            this.router.navigate('app');
        }).catch((e) => dialog.alert({
            title: "Sorry!",
            message: "The email address is badly formatted!"
        }));
    }

}
