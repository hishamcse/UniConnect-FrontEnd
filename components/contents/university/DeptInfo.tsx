import {Accordion, Button} from "react-bootstrap";
import React, {useState} from "react";
import {DeptInfoView} from "../../../models/University/Department";
import {useRouter} from "next/router";

const DeptInfo: React.FC<{ mode: string, deptInfo: DeptInfoView, userId: string }> = (props) => {

    const router = useRouter();

    const [disable, setDisable] = useState(false);

    const department: DeptInfoView = props.deptInfo;

    const teacherDetailsHandler = async (e: any) => {
        e.preventDefault();

        if(router.isReady) {
            await router.push({
                pathname: `/${props.userId}/teacherDetails`,
                query: {
                    deptId: `${props.deptInfo.departmentId}`,
                    dept: `${props.deptInfo.dept}`
                }
            });
        }
    }

    const studentDetailsHandler = async (e: any) => {
        e.preventDefault();

        const batchId = e.target.closest('Button').value?.split(' ')[0];
        const year = e.target.closest('Button').value?.split(' ')[1];

        setDisable(true);

        if(router.isReady) {
            await router.push({
                pathname: `/${props.userId}/studentDetails`,
                query: {
                    deptId: `${props.deptInfo.departmentId}`,
                    dept: `${props.deptInfo.dept}`,
                    batchId: batchId,
                    year: year
                }
            });
        }

        setDisable(false);
    }

    const addTeacherHandler = async (e: any) => {
        e.preventDefault();

        setDisable(true);
        if(router.isReady) {
            await router.push({
                pathname: `${props.userId}/addFaculty`,
                query: {
                    deptId: `${props.deptInfo.departmentId}`,
                    deptName: `${props.deptInfo.dept}`
                }
            });
        }
        setDisable(false);
    }

    return (
        <Accordion.Body>
            <h5>{department.dept}</h5>
            <h6 className='text-secondary text-left'>Faculties:</h6>
            <p className='lead'>There are {department.faculties} faculties in this department</p>
            <div className='text-center p-2'>
                <Button variant='dark' className='lead' onClick={teacherDetailsHandler}>Faculty Details</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {props.mode === 'management' &&
                    <Button variant='danger' className='lead' onClick={addTeacherHandler}>Add Faculty</Button>}
            </div>
            <h6 className='text-secondary text-left'>Students:</h6>
            <p className='lead'>There are {department.total_students} students in this department</p>
            <h6 className='text-secondary text-left'>Students by batch:</h6>
            <div className="p-2">
                <div className='lead d-inline-flex flex-column text-left'>
                    {department.students_by_year.map((data, i) =>
                        data.batch_id !== null && <Button key={i + Math.random()} variant='outline-success' className='m-2'
                                onClick={studentDetailsHandler}
                                value={data.batch_id + " " + data.batch_year} disabled={disable}>
                            <b>{data.batch_name} {data.batch_year} :</b>&nbsp; {data.students_count}
                        </Button>
                    )}
                </div>
            </div>
        </Accordion.Body>
    );
}

export default DeptInfo;