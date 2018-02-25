export class BaseController {
    constructor() {
        this.name = '';
        this.view = null;
        this.content = document.getElementById('content');
    }

    load() {
        return fetch(`/templates/${this.name}`)
            .then(response => response.text())
            .then(html => this.content.innerHTML = html)
            .then(() => this.view.init())
            .then(() => this.view.render());
    }
}