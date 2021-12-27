import {Accordion} from "react-bootstrap";
import React from "react";
import {BatchInfoView} from "../../../models/University/Batch";

const BatchInfo: React.FC<{ batch: BatchInfoView }> = (props) => {

    const {batch} = props;

    return (
        <Accordion.Body>
            <h5>Batch {batch.batch_year} : {batch.batch_name}</h5>
            <h6 className='text-secondary text-left'>Students:</h6>
            <p className='lead'>There are {batch.total_students} students in this batch</p>
            <h6 className='text-secondary text-left'>Students by Department:</h6>
            <p className='lead'>
                {batch.students_by_dept.map(data =>
                    <li key={Math.random().toString() + batch.batch_year}>
                        <b>{data.dept_name}:</b>&nbsp; {data.students_count}</li>)}
            </p>
        </Accordion.Body>
    );
}

export default BatchInfo;