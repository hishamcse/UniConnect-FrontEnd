import React from "react";
import {containerStyle, itemStyle} from "./Styling";
import {Card} from "react-bootstrap";

const StudentInfo: React.FC<{
    ROLE_ID: number | string,
    BATCH_YEAR: number,
    DEPARTMENT_NAME: string,
    SECTION_NAME: string,
    SECTION_ROLL_NO: number | string,
    UNIVERSITY_NAME: string
}> = (props) => {

    return (
        <Card style={containerStyle} className='bg-secondary text-dark p-2 m-2'>
            <div> Student</div>
            <div style={itemStyle}> Id : {props.ROLE_ID}</div>
            <div style={itemStyle}> {props.DEPARTMENT_NAME} - {props.BATCH_YEAR} Batch</div>
            <div style={itemStyle}> {props.SECTION_NAME} section. Roll No : {props.SECTION_ROLL_NO} </div>
            <div style={itemStyle}> {props.UNIVERSITY_NAME}</div>
        </Card>
    )
}

export default StudentInfo;