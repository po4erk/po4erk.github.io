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
                $('#myAdminPanel').removeClass('.hide');
                console.log("Load with login.");
            });
            
        } else {
            console.log('You are not logged in...');
            $('#content').load("js/tmpl/login.html", '', function () {
                console.log("Load was performed.");
            });
        }
    });


})(jQuery); // End of use strict