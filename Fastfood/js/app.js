import {Firebase} from './firebase'
import {Router} from './routing'

    class AppData{

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
            });
        }

        deleteData(data) {
            this.storage.ref(data).delete().then(function() {
                console.log('Delete complite!')
            }).catch(function(error) {
                console.log('Delete error!')
            });
            this.base.child(data).remove();
        };

    }

    export class AppView{

        constructor(){
            this.dao = new AppData();
            this.router = new Router();
        }

        init(){

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
                  "defaultContent": "<button type='button' class='btn btn-info edit'>Show More</button>"
                }],
            });
            this.dao.init();
            this.dao.loadTable(table);

            //Add new place
            $('#addAdd').on('click', () => {
                let newName = $('#newName').val();
                let newAddress = $('#newAddress').val();
                if(( newName == "" ) || ( newAddress == "" )){
                    alert('123');
                }else{
                    this.dao.addNew(newName,newAddress);
                    newName = $('#newName').val('');
                    newAddress = $('#newAddress').val('');
                }
            });

            //Delete place
            $('#dataTable tbody').on( 'click', '.delete', (e) => {
                let that = $( e.target );
                let data = that.parent().parent().attr('data-key');
                dialog.confirm({
                    title: "Delete place",
                    message: "Do you want delete this place?",
                    cancel: "Cancel",
                    button: "Accept",
                    required: true,
                    callback: (value) => {
                        if(value == true){
                            this.dao.deleteData(data);
                            table.rows(that.parents('tr')).remove().draw();
                        }else{
                            return false;
                        }
                    }
                    }); 
            });

            //Button LogOut
            $('#btnLogOut').on('click', (e) => {
                console.log("logout");
                dialog.confirm({
                    title: "Logout",
                    message: "Do you want to exit?",
                    cancel: "No",
                    button: "Yes",
                    required: true,
                    callback: (value) => {
                    if(value == true){
                        this.dao.firebase.auth.signOut();
                        this.router.navigate('#!login');
                    }else{
                        return false;
                    }
                    }
                });
            });

            // Button "Show more"
            $('#dataTable tbody').on( 'click', '.edit', (e) => {
                let id = $(e.target).parent().parent().attr('data-key');
                this.router.navigate(`show/${id}`);
            });
        }
        
    }



