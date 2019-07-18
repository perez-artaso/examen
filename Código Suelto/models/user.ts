export class User {
    name: string;
    email: string;
    anatomy: boolean;
    geography: boolean;
    type: string;

    constructor (_name, _email, _anatomy, _geography, _type) {
        this.name = _name;
        this.email = _email;
        this.anatomy = _anatomy;
        this.geography = _geography;
        this.type = _type;
    }
}
