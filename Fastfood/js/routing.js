
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
          loadHTML('http://127.0.0.1:8080/js/tmpl/add.html', '#addBlock'); 
      },
      'app': () => { 
          loadHTML('http://127.0.0.1:8080/js/tmpl/app.html', '#content'); 
      },
      'login': () => { 
          loadHTML('http://127.0.0.1:8080/js/tmpl/login.html', '#content'); 
      }
    });

    router.resolve();

});