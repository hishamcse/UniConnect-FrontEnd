import {Role} from "./Role";

export type LoginData = {
    personInfo: { personId: number },
    studentRoles: Role[],
    teacherRoles: Role[],
    managementRoles: Role[]
}