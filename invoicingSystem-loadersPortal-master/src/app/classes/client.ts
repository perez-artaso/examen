export class Client {
    id: number;
    mail: string;
    name: string;
    extraIds: Array<number>;

    constructor (_id: number, _mail: string, _name: string, _extraIds = null) {
        this.id = _id;
        this.mail = _mail;
        this.name = _name;
        this.extraIds = _extraIds;
    }
}
