export class BaseController {
    constructor() {
        this.name = '';
        this.content = document.getElementById('content');
    }

    load() {
        fetch(`/templates/${this.name}`)
            .then(response => this.content.innerHTML = response.text());
    }
}