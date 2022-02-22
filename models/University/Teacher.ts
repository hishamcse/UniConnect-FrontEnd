export interface Teacher {
    ROLE_ID : number,
    FULL_NAME : string,
    RANK : string,
    EMAIL : string,
    TOKEN? : string
}

export interface TeacherSummary {
    ROLE_ID: number,
    DEPARTMENT_NAME: string,
    UNIVERSITY_NAME: string
}