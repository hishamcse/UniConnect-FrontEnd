import {Department, DeptInfoView} from "../models/University/Department";

export const parseDeptData = (arr: Department[]): DeptInfoView[] => {

    let depts = new Set<string>();
    arr.forEach(data => depts.add(data.NAME));

    let allDeptDatas: DeptInfoView[] = [];

    depts.forEach(dept => {
        let temp = arr.filter(data => data.NAME === dept);
        let info: DeptInfoView = {
            dept: dept,
            faculties: temp[0].TEACHER_COUNT,
            students_by_year: temp.map(item => {
                return {
                    year: item.YEAR,
                    students_count: item.BATCH_STUDENTS_COUNT,
                    batch_id: item.BATCH_ID,
                    batch_year: item.YEAR,
                    batch_name: item.BATCH_NAME
                }
            }),
            total_students: temp[0].STUDENT_COUNT,
            departmentId : temp[0].DEPARTMENT_ID,
            batch_id: temp[0].BATCH_ID,
            batch_year: temp[0].YEAR
        }
        allDeptDatas.push(info);
    });

    return allDeptDatas;
};