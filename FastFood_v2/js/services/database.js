import { FireBaseService } from "./firebase";

export class DatabaseService {
    constructor() {
        this.name = 'Fastfoods';
        this.database = new FireBaseService().database;
    }

    get(key) {
        return key ?
            Promise.reject() :
            this.database.ref(this.name).once('value')
                .then(snapshot => this.view.data.fastfoods = snapshot.val());
    }

    delete(key) {
        return this.database.ref(this.name).child(key).remove();
    }
}