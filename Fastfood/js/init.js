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

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log('If you did not come from the address po4erk91@gmail.com, you have read-only rights!');
            window.location.href = '#!app';
        } else {
            console.log('You are not logged in...');
            window.location.href = '#!login';
        }
    });


})(jQuery); // End of use strict