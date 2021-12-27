// data while fetching
export type Department = {
    DEPARTMENT_ID: number;
    NAME: string;
    BATCH_COUNT: number;
    SECTION_COUNT: number;
    STUDENT_COUNT: number;
    TEACHER_COUNT: number;
    BATCH_ID: number;
    BATCH_NAME: string;
    YEAR: number;
    DEPT_CODE: string;
    BATCH_STUDENTS_COUNT: number
}

type StudentsByYear = {
    year: number;
    students_count: number
}

// data for UI view
export type DeptInfoView = {
    dept_short: string;
    dept_full: string;
    faculties: number;
    students_by_year: StudentsByYear[];
    total_students: number
}