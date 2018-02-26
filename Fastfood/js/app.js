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

        this.addNew = function(name,address) {
            this.name = name;
            this.address = address;
            firebase.database().ref().child('Fastfoods').push({
                name: name,
                address: address,
                rating: "Any rating",
                info: 'Any info',
            });
        }

        this.deleteData = function(data) {
            this.data = data;
            storage.ref(data).delete().then(function() {
                console.log('Delete complite!')
            }).catch(function(error) {
                console.log('Delete error!')
            });
            base.child(data).remove();
        };

    }

    function App(){
        //Add new place
        $(document).on('click','#addAdd', function(){
            let newName = $('#newName').val();
            let newAddress = $('#newAddress').val();
            if(( $.trim(newName) === "" ) || ( $.trim(newAddress) === "" )){
                dialog.alert({
                    title: 'Error',
                    message: 'You must enter all data!'
                });
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

        //Close "Show more" window
        $('#content').on( 'click','#Close', e => {
            $('#fileButton').val('');
            $('#uploader').attr('value', '0');
            router.navigate('app');
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


})(jQuery);