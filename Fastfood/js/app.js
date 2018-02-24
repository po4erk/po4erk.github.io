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
              "defaultContent": "<a href='#!show' class='btn btn-info edit'>See More</a>"
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

        this.editDataName = function(data,value){
            let thisData = base.child(data);
                thisData.update({
                    name: value
                });
        }
        this.editDataAddress = function(data,value){
            let thisData = base.child(data);
                thisData.update({
                    address: value
                });
        }
        this.editDataInfo = function(data,value){
            let thisData = base.child(data);
                thisData.update({
                    info: value
                });
        }
        this.editDataRating = function(data,value){
            let thisData = base.child(data);
                thisData.update({
                    rating: value
                });
        }

        this.addNewComment = function(data,name,comment,rating) {
            this.name = name;
            this.comment = comment;
            base.child(data+'/comments').push({
                name: name,
                comment: comment,
                rating: rating
            });   
        }
    }

    // Realisation button "Show more"
    $('#dataTable tbody').on( 'click', '.edit', function (e) {
        //Get unique attribute for this data
    export let data = $(this).parent().parent().attr('data-key');
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
                firebase.auth().signOut();
                window.location.href = '#!login';
              }else{
                  return false;
              }
            }
          });
    });


})(jQuery);