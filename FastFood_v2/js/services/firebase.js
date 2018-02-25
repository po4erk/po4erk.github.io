const config = {
    apiKey: "AIzaSyCTSrtpza1D_7tv0w82CV6cd6bqMabvGb8",
    authDomain: "test-po4erk.firebaseapp.com",
    databaseURL: "https://test-po4erk.firebaseio.com",
    projectId: "test-po4erk",
    storageBucket: "test-po4erk.appspot.com",
    messagingSenderId: "950069581603"
};

export class FireBaseService {
    constructor() {}

    get auth() {
        return firebase.auth();
    }

    get database() {
        return firebase.database();
    }

    get storage() {
        return firebase.storage();
    }

    init() {
        firebase.initializeApp(config);
    }
}