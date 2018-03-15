import {Firebase} from './firebase';

export class ShowActions{

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
    

