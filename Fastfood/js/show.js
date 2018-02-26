(function($) {
    const base = firebase.database().ref('Fastfoods');
    const storage = firebase.storage();
    const show = new Show();
    show.showMore();

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
        this.showMore = function(){
            const data = $('#dataKey').val();
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