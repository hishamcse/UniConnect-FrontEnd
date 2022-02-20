import {Department, DeptInfoView} from "../models/University/Department";

export const parseDeptData = (arr: Department[]): DeptInfoView[] => {

    let depts = new Set<string>();
    arr.forEach(data => depts.add(data.NAME));

    let allDeptDatas: DeptInfoView[] = [];

    depts.forEach(dept => {
        let temp = arr.filter(data => data.NAME === dept);
        let info: DeptInfoView = {
            dept_short: dept,
            dept_full: dept,
            faculties: temp[0].TEACHER_COUNT,
            students_by_year: temp.map(item => {
                return {
                    year: item.YEAR,
                    students_count: item.BATCH_STUDENTS_COUNT
                }
            }),
            total_students: temp[0].STUDENT_COUNT,
            departmentId : temp[0].DEPARTMENT_ID
        }
        allDeptDatas.push(info);
    });

    return allDeptDatas;
};