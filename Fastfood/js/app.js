$(document).ready(function() {
    const config = {
      apiKey: "AIzaSyCTSrtpza1D_7tv0w82CV6cd6bqMabvGb8",
      authDomain: "test-po4erk.firebaseapp.com",
      databaseURL: "https://test-po4erk.firebaseio.com",
      projectId: "test-po4erk",
      storageBucket: "test-po4erk.appspot.com",
      messagingSenderId: "950069581603"
    };
    firebase.initializeApp(config);
    const base = firebase.database().ref('Fastfoods');
    const storage = firebase.storage();
    const table = $('#dataTable').DataTable({
        "autoWidth": false,
        "destroy": true,
        "columnDefs": [{
          "width": '3%',
          "targets": 3,
          "data": null,
          "defaultContent": "<button type='button' class='btn btn-danger delete'>Delete</button>"
        },{
          "width": '3%',
          "targets": 4,
          "data": null,
          "defaultContent": "<a href='#' class='btn btn-info edit'>See More</a>"
        }],
    });

    const authorization = new Authentifications();
    const app = new App();

    function Authentifications(){

        this.logInGoogle = function(){
            const auth = firebase.auth();
            let provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider);
        }
        
        this.logInAnon = function (){
            const auth = firebase.auth();
            auth.signInAnonymously().then(function(){
                console.log("You are logged in anonymously.");
              });
        }
        //Realisation button "Login"
        this.logIn = function (email, pass){
            this.email = email;
            this.pass = pass;
            const auth = firebase.auth();
            auth.signInWithEmailAndPassword(email,pass).then(function(){
                console.log("You are logged in.");
              }).catch(function(error) {
                alert('Sign Up please!');
              });
        }

        //Realisation button "Logout"
        this.logOut = function (){
            firebase.auth().signOut();
            window.location.reload();
        }

        //Realisation button "Sign Up"
        this.signUp = function (email, pass){
            this.email = email;
            this.pass = pass;
            const auth = firebase.auth();
            auth.createUserWithEmailAndPassword(email,pass).then(function(){
                alert('Thank you for registrations!');
            });
        }

        //Authentification status tracking
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
                firebaseUser.providerData.forEach(function (profile) {
                    console.log("Sign-in provider: " + profile.providerId);
                    console.log("Provider-specific UID: " + profile.uid);
                    console.log("Email: " + profile.email);
                  });
                  firebaseUser.getIdToken().then(function(accessToken) {
                    console.log(accessToken);
                  });
                $('#myForm').addClass('hide');
                $("#myAdminPanel").removeClass('hide');
                $("#addData").removeClass('hide');
                app.loadTable();
            }else{
                $("#addData").addClass('hide');
                $('#myForm').removeClass('hide');
                $("#myAdminPanel").addClass('hide');
                console.log('You are not logged in...');
            }
        });
    }

    function App(){
        // Draw firebase table
        this.loadTable = function(){
            base.on('child_added',function(snapshot) {
                let key = snapshot.key;
                let getData = [snapshot.child("name").val(), snapshot.child("address").val(), snapshot.child("rating").val()];
                let trBuild = table.rows.add([getData]).draw().nodes();
                $(trBuild).attr('data-key',key);
            });
        }

        // Realisation button "Add New"
        this.addNew = function(name,address){
            this.name = name;
            this.address = address;
            firebase.database().ref().child('Fastfoods').push({
                name: name,
                address: address,
                rating: "Any rating",
                info: 'Any info'
            });
        }

        // Realisation button "Delete"
        $('#dataTable tbody').on( 'click', 'button', function () {
            let data = $( this ).parent().parent().attr('data-key');
            base.child(data).remove();
            table.rows($(this).parents('tr')).remove().draw();
        });

        // Realisation button "Show more"
        $('#dataTable tbody').on( 'click', 'a', function (e) {
            let that = this;
            //Show div with this info
            $(".PlacesInfo").removeClass('hide');

            //Get unique attribute for this data
            let data = $( that ).parent().parent().attr('data-key');

            //Get data of firebase by unique key(attribute);
            let thisData = base.child(data);
            //Get image of firebase storage
            storage.ref('burger.jpg').getDownloadURL().then(function(url){
                $('.image').attr('src', url);
            });

            //Listen all changes at this data
            let name = thisData.once("value").then(function(snapshot) {

                //We get the name and address using a unique key and write it in the "Show more" section and in the DOM
                var title = snapshot.child('name').val();
                var address = snapshot.child('address').val();
                var info = snapshot.child('info').val();
                var rating = snapshot.child('rating').val();
                

                var tmpl = $('#template').html();
                var compiled = Handlebars.compile(tmpl);
                var result = compiled({
                    title: title,
                    address: address,
                    info: info,
                    rating: rating,
                });
                $('#result').html(result);

                //Changes for title and address
                $('.title').on('click', function(e){
                    let newTitle = prompt('Enter a new title: ');
                    if((newTitle == '')||(newTitle == null)){
                        alert('You must enter any data!');
                    }else{
                        thisData.update({
                            name: newTitle,
                        }); 
                        $('.title').html(newTitle);
                        elem = $('[data-key='+data+'] td:eq(0)');
                        elem.html(newTitle);
                    }   
                });
                $('.address').on('click', function(e){
                    // 'https://www.google.ru/maps/place/'
                    let newAddress = prompt('Enter a new address: ');
                    if((newAddress == '')||(newAddress == null)){
                        alert('You must enter any data!');
                    }else{
                        thisData.update({
                            address: newAddress,
                        }); 
                        $('.address').html(newAddress);
                        elem = $('[data-key='+data+'] td:eq(1)');
                        elem.html(newAddress);
                    }
                });
                $('#ratingSel').on('change', function(e){
                    var newRating = $("#ratingSel").val();
                        thisData.update({
                            rating: newRating,
                        }); 
                        $('.rating').html("Rating: " + newRating);
                        elem = $('[data-key='+data+'] td:eq(2)');
                        elem.html(newRating);
                });
                $('.info').on('click', function(e){
                    let newInfo = prompt('Enter a new info: ');
                    if((newInfo == '')||(newInfo == null)){
                        alert('You must enter any data!');
                    }else{
                        thisData.update({
                            info: newInfo,
                        }); 
                        $('.info').html(newInfo);
                    }
                });
                $('.image').on('click', function(e){
                    let newImage = prompt('Enter a new src for you image: ');
                    if((newImage == '')||(newImage == null)){
                        alert('You must enter any data!');
                    }else{
                        thisData.update({
                            image: newImage,
                        }); 
                        $('.image').html(newImage);
                    }
                });
            });
            
        });

    }

    //Add a new fastfood object
    $('#addData').on('click', function(){
        let newName = prompt('Enter the new name: ');
        let newAddress = prompt('Enter the new address: ');
        if((newName == "") || (newAddress == "") ||(newName == null) || (newAddress == null)){
            alert('You must enter all data!');
        }else{
            app.addNew(newName,newAddress);
        }
    });

    //Close "Show more" window
    $('#Close').on( 'click', e => {
        e.stopPropagation();
        $(".PlacesInfo").addClass('hide');
    });

    //Button LogIn with email and pass
    $('#btnLogIn').on('click', e => {
        const email = $("#txtEmail").val();
        const pass = $("#txtPassword").val();
        authorization.logIn(email, pass);
    });

    //Button LogInAnon
    $('#btnLogInAnon').on('click', e => {
        authorization.logInAnon();
    });

    //Button LogInGoogle
    $('#btnLogInGoogle').on('click', e => {
        authorization.logInGoogle();
    });

    //Button LogOut
    $('#btnLogOut').on('click', e => {
        authorization.logOut();
    });

    //Button SignIn with email and pass
    $('#btnSignUp').on('click', e => {
        const email = $("#txtEmail").val();
        const pass = $("#txtPassword").val();
        authorization.signUp(email, pass);
    });

});