
export class Router{

    constructor(){
        this.router = new Navigo(null, true, '#!');
    }

    loadHTML(url, id){
      const req = new XMLHttpRequest();
      req.open('GET', url);
      req.send();
      req.onload = () => {
        $(id).html(req.responseText);
      };
    };

    init(){

      this.router.on({
        'addnew': () => { 
          this.loadHTML('./templates/add.html', '#addBlock');    
        },
        'app': () => {
          this.loadHTML('./templates/app.html', '#content');
        },
        'show/:key': (params) => {
          let input = document.createElement('input');
          input.id = 'dataKey';
          input.type = 'hidden';
          $('#content').append(input);
          $('#dataKey').val(`${params.key}`);
          this.loadHTML('./templates/show.html', '#addBlock');
        },
        'login': () => { 
          this.loadHTML('./templates/login.html', '#content'); 
        }
      }).resolve();

    }

    navigate(url) {
      this.router.navigate(url);
    }
}
