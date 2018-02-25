
window.addEventListener("load", function(event) {
    function $id(id) {
      return document.getElementById(id);
    }

    function loadHTML(url, id) {
      req = new XMLHttpRequest();
      req.open('GET', url);
      req.send();
      req.onload = () => {
        $(id).html(req.responseText);
      };
    }

    // use #! to hash
    router = new Navigo(null, true, '#!');
    router.on({
      'opennew': () => {

          loadHTML('js/tmpl/add.html', '#addBlock'); 
      },
      'app/:data': (params) => {
          loadTable();
          loadSeeMore(params.data); 
          // loadHTML('js/tmpl/app.html', '#content'); 
      },
      'login': () => { 
          loadHTML('js/tmpl/login.html', '#content'); 
      }
    });

    router.resolve();

});