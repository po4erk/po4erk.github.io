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

            $('#content').each(function () {
                $(this).get("js/tmpl/app.html", '', function () {
                    console.log("Load with login.");
                });
            });
            
            
        } else {
            console.log('You are not logged in...');
            $('#content').get("js/tmpl/login.html", '', function () {
                console.log("Load without login.");
            });
        }
    });


})(jQuery); // End of use strict