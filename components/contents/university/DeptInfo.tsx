import {Accordion} from "react-bootstrap";
import React from "react";
import {DeptInfoView} from "../../../models/University/Department";
import {useRouter} from "next/router";


const DeptInfo: React.FC<{deptInfo: DeptInfoView, userId : string}> = (props) => {

    
    const router = useRouter();

    const showFaculties = async (e: React.MouseEvent) => {
        e.preventDefault();

        
        await router.push(`${props.userId}/teacherDetails/${props.deptInfo.departmentId}/${props.deptInfo.dept_full}`);
    }


    const department: DeptInfoView = props.deptInfo;

    return (
        <Accordion.Body>
            <h5>{department.dept_full}</h5>
            <h6 className='text-secondary text-left'>Faculties:</h6>
            <p className='lead'>There are {department.faculties} faculties in this department.</p>
            <div className= 'lead' onClick = {showFaculties}>details</div>
            <h6 className='text-secondary text-left'>Students:</h6>
            <p className='lead'>There are {department.total_students} students in this department</p>
            <h6 className='text-secondary text-left'>Students by batch:</h6>
            <div className="p-2">
                <div className='lead d-inline-flex flex-column text-left'>
                    {department.students_by_year.map((data, i) =>
                        <li key={i + data.year}><b>{data.year}:</b>&nbsp; {data.students_count}</li>)
                    }
                </div>
            </div>
        </Accordion.Body>
    );
}

export default DeptInfo;