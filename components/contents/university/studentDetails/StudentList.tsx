import React from "react";
import StudentItem from "./StudentItem";

const StudentList: React.FC<{
    students: StudentItem[],
    fetching: boolean,
    loadData: (n: number, c: boolean, st: string[]) => void,
    selected: string[]
}> = ({students, fetching, loadData, selected}) => {

    const loadDataHandler = (e : any) => {
        e.preventDefault();

        if (fetching) return;
        loadData(students[students.length - 1].ROLE_ID, false, selected);
    }

    return (
        <ul className='list-group'>
            {students.map(item => <StudentItem item={item} key={item.ROLE_ID}/>)}
            {students.length >= 30 &&
                <div className='list-group-item text-center'>
                    <button className={'btn btn-primary'} disabled={fetching} onClick={loadDataHandler}>Load More
                    </button>
                </div>
            }
        </ul>
    )
}

export default StudentList;