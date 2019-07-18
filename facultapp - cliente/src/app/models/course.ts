export class Course {
    id: number;
    name: string;
    quarter: string;
    room: string;
    teacher: string;

    constructor(_id, _name, _quarter, _room, _teacher) {
        this.id = _id;
        this.name = _name;
        this.quarter = _quarter;
        this.room = _room;
        this.teacher = _teacher;
    }
}
