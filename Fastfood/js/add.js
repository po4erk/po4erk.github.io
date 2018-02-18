(function($) {
    const base = firebase.database().ref('Fastfoods');
    const storage = firebase.storage();
    // Realisation button "Add New"
    const addNew = function(name,address) {
        this.name = name;
        this.address = address;
        firebase.database().ref().child('Fastfoods').push({
            name: name,
            address: address,
            rating: "Any rating",
            info: 'Any info'
        });
    }

    $('#addAdd').on('click', function(){
        let newName = $('#newName').val();
        let newAddress = $('#newAddress').val();
        if(( $.trim(newName) === "" ) || ( $.trim(newAddress) === "" )){
            dialog.alert({
                title: 'Error',
                message: 'You must enter all data!'
            });
        }else{
            addNew(newName,newAddress);
            newName = $('#newName').val('');
            newAddress = $('#newAddress').val('');
        }
    });
    debugger;
    $('#newAddress').geocomplete();
})(jQuery);