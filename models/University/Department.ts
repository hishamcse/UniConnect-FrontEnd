import Faculty from "./Faculty";

export default class Department {
    name: string;
    students: number;
    teachers: Faculty[];

    constructor(name: string, students: number, teachers: Faculty[]) {
        this.name = name;
        this.students = students;
        this.teachers = teachers;
    }
}