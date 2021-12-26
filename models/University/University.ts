import Department from "./Department";

export default class University {
    name: string;
    departments: Department[];

    constructor(name: string, departments: Department[]) {
        this.name = name;
        this.departments = departments;
    }
}