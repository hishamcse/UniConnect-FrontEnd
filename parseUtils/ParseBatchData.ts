import {Batch, BatchInfoView} from "../models/University/Batch";

type BatchPair = {
    year: number;
    type: string;
}

export const parseBatchData = (arr: Batch[]) => {

    let batch_types = ['ug', 'pg'];
    let batches: BatchPair[] = [];
    arr.sort((a,b) => a.YEAR - b.YEAR);

    const pairIncludes = (pair: BatchPair) : boolean => {
        let flag: boolean = false;
        batches.forEach(data => {
            flag = data.year === pair.year && data.type === pair.type;
            if(flag) return;
        });
        return flag;
    };

    batch_types.forEach(sType => {
        arr.forEach(data => {
            let pair = {
                year: data.YEAR,
                type: data.BATCHOFSTYPE
            };

            if(sType === data.BATCHOFSTYPE && !pairIncludes(pair)) {
                batches.push(pair);
            }
        })
    });

    let allBatchDatas: BatchInfoView[] = [];

    batches.forEach( pair => {
        let temp = arr.filter(data => data.YEAR === pair.year && data.BATCHOFSTYPE === pair.type);
        let info: BatchInfoView = {
            batch_year: pair.year,
            batch_type: pair.type === 'ug' ? 'UnderGraduate' : 'PostGraduate',
            batch_name: temp[0].BATCH_NAME,
            students_by_dept: temp.map(item => {
                return {
                    dept_name: item.DEPARTMENT_NAME.split(',')[1],
                    students_count: item.STUDENT_COUNT
                }
            }),
            total_students: temp.reduce((prev,cur) => prev + cur.STUDENT_COUNT, 0)
        }
        allBatchDatas.push(info);
    });

    return allBatchDatas;
}