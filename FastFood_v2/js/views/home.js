import { View } from "./base";
import { DatabaseService } from "../services/database";
import { Router } from "../router";

export class HomeView extends View {
    constructor() {
        super();

        this.database = new DatabaseService();
    }

    init() {}

    render() {
        const fastfoods = this.data.fastfoods;
        let html = '';

        for (const key in this.data.fastfoods) {
            const fastfood = fastfoods[key];

            html += '<tr>'
            html += `<td>${fastfood.name}</td>`;
            html += `<td>${fastfood.address}</td>`;
            html += `<td>${fastfood.rating}</td>`;
            html += `<td><button class="delete-btn" data-key="${key}">Delete</button></td>`;
            html += `<td><button class="see-more-btn" data-key="${key}">See More</button></td>`;
            html += '</tr>';
        }

        document.getElementsByTagName('table')[0].innerHTML += html;

        $('.delete-btn').on('click', (event) => {
            const btn = $(event.target);

            this.database.delete(btn.data('key'))
                .then(() => new Router().navigate('home'));
        });

        $('.see-more-btn').on('click', (event) => {
            const btn = $(event.target);
            
            new Router().navigate(`home/${btn.data('key')}`);
        });
    }
}