// data while fetching departments
export type Dept_Batch = {
    DEPARTMENT_NAME: string;
    BATCH_NAME: string;
    YEAR: number;
    BATCH_ID: number;
    BATCH_TYPE: string;
    SECTION_COUNT: number;
    STUDENT_COUNT: number;
}

// data while fetching batches
export type Batch = {
    BATCH_ID: number;
    BATCH_NAME: string;
    BATCH_YEAR: number;
    DEPT_NAME: string;
    SECTION_COUNT: number;
    STUDENT_COUNT: number;
}

type Students_By_Dept = {
    dept_name: string;
    students_count: number
}

export type BatchInfoView = {
    batch_id: number;
    batch_year: number;
    batch_type: string;
    batch_name: string;
    students_by_dept: Students_By_Dept[];
    total_students: number;
}