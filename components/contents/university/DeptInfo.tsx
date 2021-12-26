import {Accordion} from "react-bootstrap";
import React from "react";

const DeptInfo: React.FC<{deptName: string}> = (props) => {
    return (
        <Accordion.Body>
            <h5>{props.deptName}</h5>
            <h6 className='text-secondary text-left'>Faculties:</h6>
            <p className='lead'>There are 53 faculties in this department</p>
            <h6 className='text-secondary text-left'>Students:</h6>
            <p className='lead'>There are 453 students in this department</p>
            <h6 className='text-secondary text-left'>Students by batch:</h6>
            <p className='lead'>
                <li><b>Batch 2015:</b>&nbsp; 120</li>
                <li><b>Batch 2016:</b>&nbsp; 117</li>
                <li><b>Batch 2017:</b>&nbsp; 118</li>
                <li><b>Batch 2018:</b>&nbsp; 118</li>
            </p>
        </Accordion.Body>
    );
}

export default DeptInfo;