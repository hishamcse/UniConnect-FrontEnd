type Students_By_Dept = {
    dept_name: string;
    students_count: number
}

export type BatchInfoView = {
    batch_year: number;
    batch_name: string;
    students_by_dept: Students_By_Dept[];
    total_students: number;
}