import {Accordion, Button} from "react-bootstrap";
import React from "react";
import {DeptInfoView} from "../../../models/University/Department";
import {useRouter} from "next/router";

const DeptInfo: React.FC<{ deptInfo: DeptInfoView, userId: string }> = (props) => {

    const router = useRouter();

    const department: DeptInfoView = props.deptInfo;

    const teacherDetailsHandler = async (e: any) => {
        e.preventDefault();

        await router.push({
            pathname: `${props.userId}/teacherDetails`,
            query: {
                deptId: `${props.deptInfo.departmentId}`,
                dept: `${props.deptInfo.dept_full}`
            }
        });
    }

    const studentDetailsHandler = async (e: any) => {
        e.preventDefault();

        if(!e.target.value) return;

        await router.push({
            pathname: `${props.userId}/studentDetails`,
            query: {
                deptId: `${props.deptInfo.departmentId}`,
                dept: `${props.deptInfo.dept_full}`,
                batchId: `${e?.target.value?.split(' ')[0]}`,
                year: `${e?.target.value?.split(' ')[1]}`
            }
        });
    }

    return (
        <Accordion.Body>
            <h5>{department.dept_full}</h5>
            <h6 className='text-secondary text-left'>Faculties:</h6>
            <p className='lead'>There are {department.faculties} faculties in this department</p>
            <Button variant='dark' className='lead' onClick={teacherDetailsHandler}>Faculty Details</Button>
            <h6 className='text-secondary text-left'>Students:</h6>
            <p className='lead'>There are {department.total_students} students in this department</p>
            <h6 className='text-secondary text-left'>Students by batch:</h6>
            <div className="p-2">
                <div className='lead d-inline-flex flex-column text-left'>
                    {department.students_by_year.map((data, i) =>
                        <Button key={i + Math.random()} variant='outline-success' className='m-2'
                                onClick={studentDetailsHandler}
                                value={data.batch_id + " " + data.batch_year}>
                            <b>{data.batch_name} {data.batch_year} :</b>&nbsp; {data.students_count}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Button>
                    )}
                </div>
            </div>
        </Accordion.Body>
    );
}

export default DeptInfo;