import {Firebase} from './firebase'
import {Router} from './routing'

export class Initialize{
    constructor(){
        this.firebase = new Firebase();
        this.router = new Router();
    }

    init(){

        this.firebase.init();
        this.router.init();

        this.firebase.auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                // this.router.navigate('app');
            } else {
                console.log('You are not logged in...');
                this.router.navigate('login');
            }
        });
    }
}
    


