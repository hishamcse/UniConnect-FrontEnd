import React from "react";
import {containerStyle, itemStyle} from "./Styling";
import {Card} from "react-bootstrap";

const TeacherInfo: React.FC<{
    ROLE_ID: string | number,
    DEPARTMENT_NAME: string,
    UNIVERSITY_NAME: string
}> = (props) => {

    return (
        <Card style={containerStyle} className='bg-secondary text-dark p-2 m-2'>
            <div> Teacher</div>
            <div style={itemStyle}> Id : {props.ROLE_ID}</div>
            <div style={itemStyle}> {props.DEPARTMENT_NAME} &nbsp;Department</div>
            <div style={itemStyle}>{props.UNIVERSITY_NAME}</div>
        </Card>
    )
}

export default TeacherInfo;