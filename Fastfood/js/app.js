(function($) {
    const router = new Navigo(null, true, '#!');
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

    class AppData{

        constructor(){
            this.name = 'Fastfoods';
            this.base = firebase.database().ref(this.name);
            this.storage = firebase.storage();
        }

        //Load table with data about place
        loadTable(){
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

    class AppView{

        init(){
            dao.loadTable();
            //Add new place
            $(document).on('click','#addAdd', function(){
                let newName = $('#newName').val();
                let newAddress = $('#newAddress').val();
                if(( newName == "" ) || ( newAddress == "" )){
                    return false;
                }else{
                    dao.addNew(newName,newAddress);
                    newName = $('#newName').val('');
                    newAddress = $('#newAddress').val('');
                }
            });

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
                let id = $(this).parent().parent().attr('data-key');
                router.navigate(`show/${id}`);
            });
        }
        
    }

    const dao = new AppData();
    const app = new AppView();
    app.init();


})(jQuery);