import {Department} from "../models/University/Department";
import {BatchInfoView} from "../models/University/Batch";

export const parseBatchData = (arr: Department[]) => {

    let batches = new Set<number>();
    arr.forEach(data => batches.add(data.YEAR));

    let allBatchDatas: BatchInfoView[] = [];

    batches.forEach(year => {
        let temp = arr.filter(data => data.YEAR === year);
        let info: BatchInfoView = {
            batch_year: year,
            batch_name: temp[0].BATCH_NAME,
            students_by_dept: temp.map(item => {
                return {
                    dept_name: item.NAME.split(',')[1],
                    students_count: item.BATCH_STUDENTS_COUNT
                }
            }),
            total_students: temp.reduce((prev,cur) => prev + cur.BATCH_STUDENTS_COUNT, 0)
        }
        allBatchDatas.push(info);
    });

    return allBatchDatas;
}