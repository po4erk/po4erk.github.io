import { BaseController } from "./base";

export class LoginController extends BaseController {
    constructor() {
        super();

        this.name = 'login';
        this.load();
    }
}