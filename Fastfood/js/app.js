(function($) {
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
    const app = new App();
    app.loadTable();

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

        // Realisation button "Delete"
        this.deleteData = function(data) {
            this.data = data;
            storage.ref(data).delete().then(function() {
                console.log('Delete complite!')
            }).catch(function(error) {
                console.log('Delete error!')
            });
            base.child(data).remove();
        };

        // Realisation button "Show more"
        $('#dataTable tbody').on( 'click', '.edit', function (e) {
            let that = this;
            //Show div with this info
            $(".PlacesInfo").removeClass('hide');

            //Get unique attribute for this data
            let data = $( that ).parent().parent().attr('data-key');

            //Get data of firebase by unique key(attribute);
            let thisData = base.child(data);
            //Get image of firebase storage

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
                                thisData.update({
                                    name: value,
                                }); 
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
                            thisData.update({
                                address: value,
                            }); 
                            $('.address').html(value);
                            elem = $('[data-key='+data+'] td:eq(1)');
                            elem.html(value);
                            $('#Address').addClass('hide');
                            $('.address').removeClass('hide');
                        }
	                }
                });

                //Changes for rating and info
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
                                thisData.update({
                                    info: value,
                                }); 
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
                $('#comments').on('click',function(e){
                    $('#comments-wrapper').toggle();
                    $('#commentaries').toggle();
                });
                const addNewComment = function(name,comment) {
                    this.name = name;
                    this.comment = comment;
                    base.child(data+'/comments').push({
                        name: name,
                        comment: comment,
                    });   
                }
                $('.comments-button').on('click',function(e){
                    let newComName = $('#comments-name').val();
                    let newComComment = $('.comments-area').val();
                    addNewComment(newComName,newComComment);
                    dialog.alert({
                        title: "Thanks!",
                        message: "Your comment has been sent successfully!"
                    });
                    $('#comments-name').val('');
                    $('.comments-area').val('');
                    $('.comments-button').unbind( "click", addNewComment );
                });
                let commentsRef = base.child(data+'/comments');
                commentsRef.on('child_added',function(snapshot){
                    let key = snapshot.key;
                    let name = snapshot.child('name').val();
                    let comment = snapshot.child('comment').val();
                    let comBlock = $('#commentaries ul');
                    let li = $('<li />').attr('data-comment', key).html('<b>'+name+'</b>' + ':    '+ comment).appendTo(comBlock);
                });

            });
            
        });

    }

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
                    app.deleteData(data);
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
                var _0x3132=["\x6A\x73\x2F\x74\x6D\x70\x6C\x2F\x6C\x6F\x67\x69\x6E\x2E\x68\x74\x6D\x6C"];
                let url=_0x3132[0];
                firebase.auth().signOut();
                window.location.href = '#!login';
              }else{
                  return false;
              }
            }
          });
    });


})(jQuery);