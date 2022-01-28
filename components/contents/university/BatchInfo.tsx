import {Accordion, Button} from "react-bootstrap";
import React from "react";
import {BatchInfoView} from "../../../models/University/Batch";
import {useRouter} from "next/router";

const BatchInfo: React.FC<{ mode:string, batch: BatchInfoView, userId: string }> = (props) => {

    const {batch} = props;
    const router = useRouter();

    const addSection = async (e: React.MouseEvent) => {
        e.preventDefault();

        await router.push({
            pathname: `${props.userId}/addSecStudent`,
            query: {
                batchId: batch.batch_id
            }
        });
    }

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
            {props.mode==='management' &&
                <Button className='center-block' variant='info' onClick={addSection}>
                Add Section & Student
            </Button>}
        </Accordion.Body>
    );
}

export default BatchInfo;