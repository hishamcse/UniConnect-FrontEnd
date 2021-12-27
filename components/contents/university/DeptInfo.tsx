import {Accordion} from "react-bootstrap";
import React from "react";
import {DeptInfoView} from "../../../models/University/Department";

const DeptInfo: React.FC<{deptInfo: DeptInfoView}> = (props) => {

    const department: DeptInfoView = props.deptInfo;

    return (
        <Accordion.Body>
            <h5>{department.dept_full}</h5>
            <h6 className='text-secondary text-left'>Faculties:</h6>
            <p className='lead'>There are {department.faculties} faculties in this department</p>
            <h6 className='text-secondary text-left'>Students:</h6>
            <p className='lead'>There are {department.total_students} students in this department</p>
            <h6 className='text-secondary text-left'>Students by batch:</h6>
            <p className='lead'>
                {department.students_by_year.map((data, i) =>
                    <li key={i + data.year}><b>{data.year}:</b>&nbsp; {data.students_count}</li>)
                }
            </p>
        </Accordion.Body>
    );
}

export default DeptInfo;