// data while fetching
export type Batch = {
    DEPARTMENT_NAME: string;
    BATCH_NAME: string;
    YEAR: number;
    BATCH_ID: number;
    BATCHOFSTYPE: string;
    SECTION_COUNT: number;
    STUDENT_COUNT: number;
}

type Students_By_Dept = {
    dept_name: string;
    students_count: number
}

export type BatchInfoView = {
    batch_year: number;
    batch_type: string;
    batch_name: string;
    students_by_dept: Students_By_Dept[];
    total_students: number;
}