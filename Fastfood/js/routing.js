import {AppView} from './app'
import {ShowView} from './show';
import {AuthView} from './login';

let instance = null;

export class Router{

    constructor(){
        if(instance) return instance;
        instance = this;

        this.router = new Navigo(null, true, '#!');
        this.app = new AppView();
        this.authView = new AuthView();
        this.show = new ShowView();
    }

    loadHTML(url, id){
      return fetch(url)
        .then(response => response.text())
        .then(html => $(id).html(html));
    };

    init(){

      this.router.on({
        'addnew': () => {
          this.loadHTML('./templates/app.html', '#content')
            .then(() => this.loadHTML('./templates/add.html', '#addBlock'))
            .then(() => this.app.init());
        },
        'app': () => {
          this.loadHTML('./templates/app.html', '#content')
            .then(() => this.app.init());
        },
        'show/:key': (params) => {
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
        },
        'login': () => { 
          this.loadHTML('./templates/login.html', '#content')
          .then(() => this.authView.init()); 
        },
        '': () => this.router.navigate('app')
      }).resolve();

    }

    navigate(url) {
      this.router.navigate(url);
    }
}
