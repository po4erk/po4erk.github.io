import {AppView} from './appView'
import {ShowView} from './showView';
import {AuthView} from './loginView';

let instance = null;

export class Router{

    constructor(){
        if(instance) return instance;
        instance = this;

        this.router = new Navigo(null, true, '#!');
    }

    loadHTML(url, id){
      return fetch(url)
        .then(response => response.text())
        .then(html => $(id).html(html));
    };

    addNewRoute(){
      this.app = new AppView();
        this.loadHTML('./templates/app.html', '#content')
          .then(() => this.loadHTML('./templates/add.html', '#addBlock'))
          .then(() => this.app.init());
    }
    appRoute(){
      this.app = new AppView();
          this.loadHTML('./templates/app.html', '#content')
            .then(() => this.app.init());
    }
    showRoute(params){
      this.app = new AppView();
        this.show = new ShowView();
        this.loadHTML('./templates/app.html', '#content')
          .then(() => this.app.init())
          .then(() => {
            let input = document.createElement('input');
            input.id = 'dataKey';
            input.type = 'hidden';
            $('#content').append(input);
            $('#dataKey').val(`${params.key}`);
          })
          .then(() => this.loadHTML('./templates/show.html', '#addBlock'))
          .then(() => this.show.showMore());
    }
    loginRoute(){
      this.authView = new AuthView();
      this.loadHTML('./templates/login.html', '#content')
      .then(() => this.authView.init());
    }

    init(){

      this.router.on({
        'addnew': () => this.addNewRoute(),
        'app': () => this.appRoute(),
        'show/:key': (params) => this.showRoute(params),
        'login': () => this.loginRoute(),
        '': () => this.appRoute()
      }).resolve();

    }

    navigate(url) {
      this.router.navigate(url);
    }
}
