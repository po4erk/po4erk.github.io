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
    router = new Navigo(null, true, '#!');

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            router.navigate('app');
        } else {
            console.log('You are not logged in...');
            router.navigate('login');
        }
    });


})(jQuery);