// data while fetching 'id/depts'
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
    students_count: number;
    batch_id: number;
    batch_year: number;
    batch_name: string
}

// data for UI view
export type DeptInfoView = {
    dept: string;
    departmentId : number
    faculties: number;
    students_by_year: StudentsByYear[];
    total_students: number;
    batch_id: number;
    batch_year: number
}