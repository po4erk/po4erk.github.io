import {Router} from './routing';
import {AppData} from './app';

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
                dialog.alert({
                    title: "Sorry!",
                    message: "You must enter name and address!"
                });
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