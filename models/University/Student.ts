export interface Student {
    ROLE_ID : number,
    FULL_NAME : string,
    EMAIL : string,
    SECTION_NAME : string,
    SECTION_ROLL_NO : number,
    TOKEN? : string
}

export interface StudentSummary {
    ROLE_ID: number,
    BATCH_YEAR: number,
    DEPARTMENT_NAME: string,
    SECTION_NAME: string,
    SECTION_ROLL_NO: number,
    UNIVERSITY_NAME: string
}