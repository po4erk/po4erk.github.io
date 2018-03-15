import {Firebase} from './firebase';

export class AppData{

    constructor(){
        this.firebase = new Firebase();
        this.name = 'Fastfoods';
    }

    init(){
        this.base = this.firebase.database.ref(this.name);
        this.storage = this.firebase.storage;
    }
    //Load table with data about place
    loadTable(table){
        
        this.base.on('child_added',function(snapshot) {
            let key = snapshot.key;
            let getData = [snapshot.child("name").val(), snapshot.child("address").val(), snapshot.child("rating").val()];
            let trBuild = table.rows.add([getData]).draw().nodes();
            $(trBuild).attr('data-key',key);
        });
    };

    addNew(name,address) {
        this.base.push({
            name: name,
            address: address,
            rating: "Any rating",
            info: 'Any info',
        }).then(function() {
            setTimeout(function(){
                $('.alert-success').fadeOut('slow');
            },1500);
            $('.alert-success').text('Place added!').fadeIn('slow');
        }).catch(function(error) {
            setTimeout(function(){
                $('.alert-danger').fadeOut('slow');
            },2000);
            $('.alert-danger').text('Place was not added!').fadeIn('slow');
        });
    }

    deleteData(data) {
        this.storage.ref(data).delete().then(function() {
            console.log('Delete image complite!')
        }).catch(function(error) {
            console.log('Delete image error!')
        });
        this.base.child(data).remove()
        .then(function() {
            setTimeout(function(){
                $('.alert-success').fadeOut('slow');
            },1500);
            $('.alert-success').text('Place deleted!').fadeIn('slow');
        }).catch(function(error) {
            setTimeout(function(){
                $('.alert-danger').fadeOut('slow');
            },2000);
            $('.alert-danger').text('Place was not deleted!').fadeIn('slow');
        });;
    };

}





