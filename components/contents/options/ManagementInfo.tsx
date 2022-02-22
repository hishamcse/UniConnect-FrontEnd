import React from "react";
import {containerStyle, itemStyle} from "./Styling";
import {Card} from "react-bootstrap";

const ManagementInfo: React.FC<{
    UNIVERSITY_NAME: string,
    MANAGEMENT_ID: number | string
}> = (props) => {

    return (
        <Card style={containerStyle} className='bg-secondary text-dark p-2 m-2'>
            <div> Management</div>
            <div style={itemStyle}> Id : {props.MANAGEMENT_ID}</div>
            <div style={itemStyle}>{props.UNIVERSITY_NAME}</div>
        </Card>
    )
}

export default ManagementInfo;