
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
      'app': () => {
        loadHTML('js/tmpl/app.html', '#content');
      },
      'show/:key': (params) => {
        let input = document.createElement('input');
        input.id = 'dataKey';
        input.type = 'hidden';
        $('#content').append(input);
        $('#dataKey').val(`${params.key}`);
        loadHTML('js/tmpl/show.html', '#addBlock');
      },
      'login': () => { 
          loadHTML('js/tmpl/login.html', '#content'); 
      }
    });

    router.resolve();

});