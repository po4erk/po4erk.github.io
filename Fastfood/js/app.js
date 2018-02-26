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
        $(document).on( 'click','#Close', e => {
            e.stopPropagation();
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
            //Show div with this info

    
            //Get unique attribute for this data
            let data = $(this).parent().parent().attr('data-key');
            
            
            router.navigate(`show/${data}`);
            
        });
    }


})(jQuery);