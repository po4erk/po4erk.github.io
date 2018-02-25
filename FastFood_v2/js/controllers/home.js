import { BaseController } from "./base";
import { HomeView } from "../views/home";
import { FireBaseService } from "../services/firebase";

export class HomeController extends BaseController {
    constructor() {
        super();
        
        this.name = 'home';
        this.view = new HomeView();

        this.database = new FireBaseService().database;
    }

    load() {
        return this.database.ref('Fastfoods').once('value')
            .then(snapshot => this.view.data.fastfoods = snapshot.val())
            .then(() => super.load());
    }
}