(function($) {
    const router = new Navigo(null, true, '#!');
    const id = $('#dataKey').val();
    const base = firebase.database().ref('Fastfoods');
    const storage = firebase.storage();

    class showActions{
        
        //Calculating the overall rating
        rating(id,array){
            console.log(array);
            let sum = 0;
            let mRating;
            for(let i = 0; i < array.length; i++){
                sum += +array[i];
                mRating = sum/array.length;
            }
            let allRating = Math.floor(mRating);
            console.log(allRating);
            actions.editDataRating(id,allRating);
            let elem = $('[data-key='+id+'] td:eq(2)');
            elem.html(allRating);
        };

        downloadImage(){
            storage.ref(id).getDownloadURL().then(function(url){
                $('.image').attr('src', url);
            });
        }

        editDataName(id,value){
            let thisData = base.child(id);
                thisData.update({
                    name: value
                });
        };

        editDataAddress(id,value){
            let thisData = base.child(id);
                thisData.update({
                    address: value
                });
        };

        editDataInfo(id,value){
            let thisData = base.child(id);
                thisData.update({
                    info: value
                });
        };

        editDataRating(id,value){
            let thisData = base.child(id);
                thisData.update({
                    rating: value
                });
        };

        addNewComment(id,name,comment,rating) {
            base.child(id+'/comments').push({
                name: name,
                comment: comment,
                rating: rating
            });   
        };
        
        deleteNewComment(id,key) {
            base.child(id+'/comments'+'/'+key).remove();
        };
    }
    
    class showView{
        //Show more window about each place
        showMore(){

            actions.downloadImage();

            //Listen all changes at this data
            let thisData = base.child(id);
            thisData.once("value").then(function(snapshot) {

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
                                actions.editDataName(id,value);
                                $('.title').html(value);
                                let elem = $('[data-key='+id+'] td:eq(0)');
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
                            actions.editDataAddress(id,value);
                            $('.address').html(value);
                            let elem = $('[data-key='+id+'] td:eq(1)');
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
                                actions.editDataInfo(id,value);
                                $('.info').html(value);
                            }
                        }
                    });
                });

                //Upload new image
                $('#fileButton').on('change', function(e){
                    let file = e.target.files[0];
                    let storageRef = storage.ref(id);
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
                        actions.downloadImage();
                    }
                    );
                });
                
                


                //Comments realisation
                    let arr = [];
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
                            actions.addNewComment(id,newComName,newComComment,newRating);
                            dialog.alert({
                                title: "Thanks!",
                                message: "Your comment has been sent successfully!"
                            });
                            $('#comments-name').val('');
                            $('.comments-area').val('');
                            $('#commentaries').html('');
                            arr = [];
                            seeComment();
                            actions.rating(id,arr);
                        }
                    });

                    //Delete new comment
                    $('#commentaries').on('click', '.comDelete', (e) => {
                        let key = event.target.getAttribute('data-comment');
                        $(event.target).parent().remove();
                        actions.deleteNewComment(id,key);
                        $('#commentaries').html('');
                        arr = [];
                        seeComment();
                        actions.rating(id,arr);
                    });

                    //Rating realisation            
                    function seeComment(){
                        let commentsRef = base.child(id+'/comments');
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
                    };

            });

            //Close "Show more" window
            $('#content').on( 'click','#Close', e => {
                $('#fileButton').val('');
                $('#uploader').attr('value', '0');
                router.navigate('app');
            });
        };
    }

    const actions = new showActions();
    const show = new showView();
    show.showMore();
    
})(jQuery);