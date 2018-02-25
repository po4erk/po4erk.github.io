(function($) {
    router = new Navigo(null, true, '#!');
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
              "defaultContent": "<button type='button' class='btn btn-info edit'>See More</button>"
            }],
    });

    const dao = new DataAccessObject();
    const app = new App();
    const show = new Show();

    dao.loadTable();

    function DataAccessObject(){

        //Load table with data about place
        this.loadTable = function(){
            base.on('child_added',function(snapshot) {
                let key = snapshot.key;
                let getData = [snapshot.child("name").val(), snapshot.child("address").val(), snapshot.child("rating").val()];
                let trBuild = table.rows.add([getData]).draw().nodes();
                $(trBuild).attr('data-key',key);
            });
        };

        //Delete data about place
        this.deleteData = function(data) {
            this.data = data;
            storage.ref(data).delete().then(function() {
                console.log('Delete complite!')
            }).catch(function(error) {
                console.log('Delete error!')
            });
            base.child(data).remove();
        };

        //Edit name address info and rating
            this.editDataName = function(data,value){
                let thisData = base.child(data);
                    thisData.update({
                        name: value
                    });
            };
            this.editDataAddress = function(data,value){
                let thisData = base.child(data);
                    thisData.update({
                        address: value
                    });
            };
            this.editDataInfo = function(data,value){
                let thisData = base.child(data);
                    thisData.update({
                        info: value
                    });
            };
            this.editDataRating = function(data,value){
                let thisData = base.child(data);
                    thisData.update({
                        rating: value
                    });
            };

        //Delete and add new coment
        this.addNewComment = function(data,name,comment,rating) {
            base.child(data+'/comments').push({
                name: name,
                comment: comment,
                rating: rating
            });   
        };
        this.deleteNewComment = function(data,key) {
            base.child(data+'/comments'+'/'+key).remove();
        };
    }

    function App(){

        //Delete fastfood object
        $('#dataTable tbody').on( 'click', '.delete', function () {
            let that = $( this );
            let data = that.parent().parent().attr('data-key');
            dialog.confirm({
                title: "Delete place",
                message: "Do you want delete this place?",
                cancel: "Cancel",
                button: "Accept",
                required: true,
                callback: function(value){
                    if(value == true){
                        dao.deleteData(data);
                        table.rows(that.parents('tr')).remove().draw();
                    }else{
                        return false;
                    }
                }
                }); 
        });

        //Close "Show more" window
        $('#Close').on( 'click', e => {
            e.stopPropagation();
            $(".PlacesInfo").addClass('hide');
            $('#fileButton').val('');
            $('#uploader').attr('value', '0');
        });

        //Button LogOut
        $('#btnLogOut').on('click', function(e) {
            console.log("logout");
            dialog.confirm({
                title: "Logout",
                message: "Do you want to exit?",
                cancel: "No",
                button: "Yes",
                required: true,
                callback: function(value){
                if(value == true){
                    firebase.auth().signOut();
                    router.navigate('#!login');
                }else{
                    return false;
                }
                }
            });
        });

        // Realisation button "Show more"
        $('#dataTable tbody').on( 'click', '.edit', function (e) {
            //Show div with this info
            $(".PlacesInfo").removeClass('hide');
    
            //Get unique attribute for this data
            let data = $(this).parent().parent().attr('data-key');
            
            show.showMore(data);
            
        });
    }

    function Show(){

        //Calculating the overall rating
        this.Rating = function(data,array){
            console.log(array);
            let sum = 0;
            let mRating;
            for(let i = 0; i < array.length; i++){
                sum += +array[i];
                mRating = sum/array.length;
            }
            let allRating = Math.floor(mRating);
            console.log(allRating);
            dao.editDataRating(data,allRating);
            let elem = $('[data-key='+data+'] td:eq(2)');
            elem.html(allRating);
        };

        //Show more window about each place
        this.showMore = function(data){
            this.data = data;

            let thisData = base.child(data);
            //Listen all changes at this data
            let name = thisData.once("value").then(function(snapshot) {

                //We get the name and address using a unique key and write it in the "Show more" section and in the DOM
                var title = snapshot.child('name').val();
                var address = snapshot.child('address').val();
                var info = snapshot.child('info').val();
                var rating = snapshot.child('rating').val();;
                

                var tmpl = $('#template').html();
                var compiled = Handlebars.compile(tmpl);
                var result = compiled({
                    title: title,
                    address: address,
                    info: info,
                    rating: rating,
                });
                $('#result').html(result);

                //Changes for title
                $('.title').on('click', function(e){
                    let newTitle = dialog.prompt({
                        title: "New Name",
                        message: "Enter new name",
                        button: "Submit",
                        required: true,
                        input: {
                            type: "text",
                            placeholder: "New name..."
                        },
                        validate: function(value){
                            if( $.trim(value) === "" ){
                                return false;
                            }else{
                                dao.editDataName(data,value);
                                $('.title').html(value);
                                elem = $('[data-key='+data+'] td:eq(0)');
                                elem.html(value);
                            }
                        }
                    });  
                });

                //Changes for address and geolocation
                const geocomplete = $('#detailsAddress');
                const map = geocomplete.geocomplete({ map: '#map' });
                geocomplete.trigger('geocode');
                $('#Address').geocomplete({ map: '#map' });
                $('#Address').trigger('geocode');
                $('.address').on('click', function(e){
                    $('.address').addClass('hide');
                    $('#Address').removeClass('hide');
                });
                $('#Address').on('keypress',function(e){
                    e = e || window.event;
                    let value = $('#Address').val();
                    if (e.keyCode === 13) {
                        if( $.trim(value) === "" ){
                            return false;
                        }else{
                            dao.editDataAddress(data,value);
                            $('.address').html(value);
                            elem = $('[data-key='+data+'] td:eq(1)');
                            elem.html(value);
                            $('#Address').addClass('hide');
                            $('.address').removeClass('hide');
                        }
                    }
                });

                //Changes for info
                $('.info').on('click', function(e){
                    let newInfo = dialog.prompt({
                        title: "New Info about place",
                        message: "Enter new info about this place",
                        button: "Submit",
                        required: true,
                        input: {
                            type: "text",
                            placeholder: "New info..."
                        },
                        validate: function(value){
                            if( $.trim(value) === "" ){
                                return false;
                            }else{
                                dao.editDataInfo(data,value);
                                $('.info').html(value);
                            }
                        }
                    });
                });

                //Upload new image
                $('#fileButton').on('change', function(e){
                    let file = e.target.files[0];
                    let storageRef = storage.ref(data);
                    let task = storageRef.put(file);
                    task.on('state_changed',
                    function progress(snapshot){
                        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        $('#uploader').val(percentage);
                    },
                    function error(err){
                        console.log('Upload image for this place.');
                    },
                    function complete(){
                        console.log('Complite!')
                        $('.image').attr('src', '');
                        downloadImage();
                    }
                    );
                });
                function downloadImage(){
                    storage.ref(data).getDownloadURL().then(function(url){
                        $('.image').attr('src', url);
                    });
                }
                downloadImage();


                //Comments realisation

                    //Comments button
                    $('#comments').on('click',function(e){
                        $('#comments-wrapper').toggle();
                        $('#commentaries').toggle();
                        seeComment();
                    });
                    
                    //Add new comment
                    $('#comments-button').on('click',function(e){
                        let newComName = $('#comments-name').val();
                        let newComComment = $('.comments-area').val();
                        let newRating = $("#ratingSel").val();
                        if((newComName=="")||(newComComment=="")||(newRating=='Rating:')){
                            dialog.alert({
                                title: "Fields not filled!",
                                message: "You must fill in all fields!"
                            });
                        }else{
                            dao.addNewComment(data,newComName,newComComment,newRating);
                            dialog.alert({
                                title: "Thanks!",
                                message: "Your comment has been sent successfully!"
                            });
                            $('#comments-name').val('');
                            $('.comments-area').val('');
                            $('#commentaries').html('');
                            arr = [];
                            seeComment();
                            show.Rating(data,arr);
                        }
                    });

                    //Rating realisation            
                    let arr = [];
                    function seeComment(){
                        let commentsRef = base.child(data+'/comments');
                        commentsRef.on('child_added',function(snapshot){
                            
                            let key = snapshot.key;
                            let name = snapshot.child('name').val();
                            let comment = snapshot.child('comment').val();
                            let rating = snapshot.child('rating').val();
                            
                            arr.push(rating);
                            
                            let comTmpl = $('#comTemplate').html();
                            let compiledCom = Handlebars.compile(comTmpl);
                            let resultCom = compiledCom({
                                comments:[{
                                    key: key,
                                    name: name,
                                    comment: comment,
                                    rating: rating
                                }]
                            });
                            $('#commentaries').append(resultCom);
                        });
                    }
                    
                    //Delete new comment
                    $('#commentaries').on('click', '.comDelete', (e) => {
                        let key = event.target.getAttribute('data-comment');
                        $(event.target).parent().remove();
                        dao.deleteNewComment(data,key);
                        $('#commentaries').html('');
                        arr = [];
                        seeComment();
                        show.Rating(data,arr);
                    });

            });
        };
        
    }

})(jQuery);