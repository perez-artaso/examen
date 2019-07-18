export class Client {
    id: number;
    name: string;
    mail: string;
    extraIds: Array<number>;

    constructor(_id: number, _name: string, _mail: string, _extraIds: Array<number> = null) {
        this.id = _id;
        this.name = _name;
        this.mail = _mail;
        this.extraIds = _extraIds;
    }
}
