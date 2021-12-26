import {Accordion} from "react-bootstrap";
import React from "react";

const BatchInfo: React.FC<{ batch: string; batchName: string }> = (props) => {

    return (
        <Accordion.Body>
            <h5>Batch {props.batch} : {props.batchName}</h5>
            <h6 className='text-secondary text-left'>Students:</h6>
            <p className='lead'>There are 1053 students in this batch</p>
            <h6 className='text-secondary text-left'>Students by Department:</h6>
            <p className='lead'>
                <li><b>CSE:</b>&nbsp; 120</li>
                <li><b>EEE:</b>&nbsp; 117</li>
                <li><b>ME:</b>&nbsp; 118</li>
                <li><b>CE:</b>&nbsp; 118</li>
                <li><b>BME:</b>&nbsp; 118</li>
                <li><b>ChE:</b>&nbsp; 118</li>
            </p>
        </Accordion.Body>
    );
}

export default BatchInfo;