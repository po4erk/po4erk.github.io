import {Firebase} from './firebase'
import {Router} from './routing'

    class ShowActions{

        constructor(){
            this.firebase = new Firebase();
            this.name = 'Fastfoods';
        }

        init(){
            this.base = this.firebase.database.ref(this.name);
            this.storage = this.firebase.storage;
        }

        getShowData(id){
            let thisData = this.base.child(id);
            return thisData.once("value").then((snapshot) => {

                //We get the name and address using a unique key and write it in the "Show more" section and in the DOM
                var title = snapshot.child('name').val();
                var address = snapshot.child('address').val();
                var info = snapshot.child('info').val();
                var rating = snapshot.child('rating').val();

                return {
                    title,
                    address,
                    info,
                    rating
                };

            });
        }

        getShowComments(id){
            let commentsRef = this.base.child(id+'/comments');
            return commentsRef.once('value').then((snapshot) => {
                return snapshot.val();
            })
        }

        uploadImage(target,id){
            let file = target.files[0];
            let storageRef = this.storage.ref(id);
            let task = storageRef.put(file);
            task.on('state_changed',
                (snapshot) => {
                    let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    $('#uploader').val(percentage);
                },
                (err) => {
                    console.log('Upload image for this place.');
                },
                () => {
                    console.log('Image uploaded!')
                    $('.image').attr('src', '');
                    this.downloadImage(id);
                }
            );
        }

        downloadImage(id){
            return this.storage.ref(id).getDownloadURL().then((url) => {
                $('.image').attr('src', url);
            }).catch(e => console.error("Image does not exist!"));
        }
        
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
            this.editDataRating(id,allRating);
            let elem = $('[data-key='+id+'] td:eq(2)');
            elem.html(allRating);
        };

        editDataName(id,value){
            let thisData = this.base.child(id);
                thisData.update({
                    name: value
                });
        };

        editDataAddress(id,value){
            let thisData = this.base.child(id);
                thisData.update({
                    address: value
                });
        };

        editDataInfo(id,value){
            let thisData = this.base.child(id);
                thisData.update({
                    info: value
                });
        };

        editDataRating(id,value){
            let thisData = this.base.child(id);
                thisData.update({
                    rating: value
                });
        };

        addNewComment(id,name,comment,rating) {
            this.base.child(id+'/comments').push({
                name: name,
                comment: comment,
                rating: rating
            });   
        };
        
        deleteNewComment(id,key) {
            this.base.child(id+'/comments'+'/'+key).remove();
        };
    }
    
    export class ShowView{

        constructor(){
            this.router = new Router();
            this.actions = new ShowActions();
        }

        //Show more window about each place
        showMore(){
            const id = $('#dataKey').val();
            
            this.actions.init();
            this.actions.getShowData(id)
            .then(data => {
                    let tmpl = $('#template').html();
                    let compiled = Handlebars.compile(tmpl);
                    let result = compiled(data);
                    $('#result').html(result);
                })
            .then(() => this.actions.downloadImage(id))
            .then(() => {

                //Changes for title
                $('.title').on('click', (e) => {
                    let newTitle = dialog.prompt({
                        title: "New Name",
                        message: "Enter new name",
                        button: "Submit",
                        input: {
                            type: "text",
                            placeholder: "New name..."
                        },
                        validate: (value) => {
                            if( $.trim(value) === "" ){
                                return false;
                            }else{
                                this.actions.editDataName(id,value);
                                $('.title').html(value);
                                let elem = $('[data-key='+id+'] td:eq(0)');
                                elem.html(value);
                            }
                        }
                    });  
                });

                //Changes for address and geolocation
                $('#Address').geocomplete({ map: '#map' });
                $('#Address').trigger('geocode');
                $('.address').on('click', (e) => {
                    $('.address').addClass('hide');
                    $('#Address').removeClass('hide');
                });
                $('#Address').on('keypress', (e) => {
                    e = e || window.event;
                    let value = $('#Address').val();
                    if (e.keyCode === 13) {
                        if( $.trim(value) === "" ){
                            return false;
                        }else{
                            this.actions.editDataAddress(id,value);
                            $('.address').html(value);
                            let elem = $('[data-key='+id+'] td:eq(1)');
                            elem.html(value);
                            $('#Address').addClass('hide');
                            $('.address').removeClass('hide');
                        }
                    }
                });

                //Changes for info
                $('.info').on('click', (e) => {
                    let newInfo = dialog.prompt({
                        title: "New Info about place",
                        message: "Enter new info about this place",
                        button: "Submit",
                        input: {
                            type: "text",
                            placeholder: "New info..."
                        },
                        validate: (value) => {
                            if( $.trim(value) === "" ){
                                return false;
                            }else{
                                this.actions.editDataInfo(id,value);
                                $('.info').html(value);
                            }
                        }
                    });
                });

                //Upload new image
                $('#fileButton').on('change', (e) => {
                    let target = e.target;
                    this.actions.uploadImage(target,id);
                });
            
                //Comments button
                $('#comments').on('click', (e) => {
                    $('#comments-wrapper').toggle();
                    $('#commentaries').toggle();
                    $('#commentaries').empty();
                    this.seeComment(id);
                });
                
                //Add new comment
                $('#comments-button').on('click', (e) => {
                    let newComName = $('#comments-name').val();
                    let newComComment = $('.comments-area').val();
                    let newRating = $("#ratingSel").val();
                    if((newComName=="")||(newComComment=="")||(newRating=='Rating:')){
                        dialog.alert({
                            title: "Fields not filled!",
                            message: "You must fill in all fields!"
                        });
                    }else{
                        this.actions.addNewComment(id,newComName,newComComment,newRating);
                        dialog.alert({
                            title: "Thanks!",
                            message: "Your comment has been sent successfully!"
                        });
                        $('#comments-name').val('');
                        $('.comments-area').val('');
                        $('#commentaries').html('');
                        this.seeCommentAndUpdateRating(id);
                    }
                });

                //Delete new comment
                $('#commentaries').on('click', '.comDelete', (e) => {
                    let key = event.target.getAttribute('data-comment');
                    let elem = $(event.target).parent();
                    dialog.confirm({
                        title: "Delete comment",
                        message: "Do you want delete this comment?",
                        cancel: "Cancel",
                        button: "Accept",
                        required: true,
                        callback: (value) => {
                            if(value === true){
                                elem.remove();
                                this.actions.deleteNewComment(id,key)
                                $('#commentaries').html('');
                                this.seeCommentAndUpdateRating(id);
                            }else{
                                return false;
                            }
                        }
                    });
                });

            });

            //Close "Show more" window
            $('#content').on( 'click','#Close', e => {
                $('#fileButton').val('');
                $('#uploader').attr('value', '0');
                this.router.navigate('app');
            });
        }

        seeCommentAndUpdateRating(id) {
            let arr = [];
            this.seeComment(id, arr).then(() => {
                this.actions.rating(id,arr);
            });
        }
           
        seeComment(id, arr){
            if (!arr) arr = [];
            return this.actions.getShowComments(id).then(comments => {
                for (const key in comments) {
                    const {name, comment, rating} = comments[key];
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
                }
            });
        };
    }
