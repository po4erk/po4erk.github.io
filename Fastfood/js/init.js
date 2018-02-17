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

    window.addEventListener("popstate", function(e) {
        getContent(location.pathname, false);
    });

    function getContent(url, addEntry) {
        $.get(url)
        .done(function( html ) {
            $('#content').html(html);
            if(addEntry == true) {
                history.pushState(null, null, url);
            }
        });
    }

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log('If you did not come from the address po4erk91@gmail.com, you have read-only rights!');
            var _0xa14f=["\x6A\x73\x2F\x74\x6D\x70\x6C\x2F\x61\x70\x70\x2E\x68\x74\x6D\x6C"];
            let url=_0xa14f[0];
            getContent(url, true)
            
        } else {
            console.log('You are not logged in...');
            var _0x3132=["\x6A\x73\x2F\x74\x6D\x70\x6C\x2F\x6C\x6F\x67\x69\x6E\x2E\x68\x74\x6D\x6C"];
            let url=_0x3132[0];
            getContent(url, true)
        }
    });


})(jQuery); // End of use strict