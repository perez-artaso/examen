export class User {
    id: number;
    email: string;
    type: number;

    constructor(_id, _email, _type) {
        this.id = _id;
        this.email = _email;
        this.type = _type;
    }
}
