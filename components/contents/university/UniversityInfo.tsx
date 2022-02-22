import React, {useContext, useEffect, useState} from "react";
import Departments from "./Departments";
import {Accordion} from "react-bootstrap";
import Batches from "./Batches";
import styles from './UniversityInfo.module.scss';
import {parseDeptData} from "../../../parseUtils/ParseDeptData";
import {DeptInfoView} from "../../../models/University/Department";
import {BatchInfoView} from "../../../models/University/Batch";
import {parseBatchData} from "../../../parseUtils/ParseBatchData";
import AuthContext from "../../../store/auth-context";

const server = 'http://localhost:3000';

const UniversityInfo: React.FC<{ mode: string, userId: string }> = (props) => {

    const authCtx = useContext(AuthContext);

    const [versityName, setVersityName] = useState<string>();
    const [deptData, setDeptData] = useState<DeptInfoView[]>([]);
    const [batchData, setBatchData] = useState<BatchInfoView[]>([]);

    useEffect(() => {

        let uniName: string;
        const order = parseInt(authCtx.loggedOrder);

        if (authCtx.loggedInAs === 'management') {
            uniName = authCtx.loginData.managementRoles[order].UNIVERSITY_NAME;
        } else if (authCtx.loggedInAs === 'student') {
            uniName = authCtx.loginData.studentRoles[order].UNIVERSITY_NAME;
        } else {
            uniName = authCtx.loginData.teacherRoles[order].UNIVERSITY_NAME;
        }

        setVersityName(uniName);
        fetch(`${server}/departments`, {
            mode: 'cors',
            method: 'get',
            credentials: "include",
        })
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                console.log(data);
                let arr = parseDeptData(data);
                setDeptData(arr);
            });

        fetch(`${server}/batches`, {
            mode: 'cors',
            method: 'get',
            credentials: "include",
        })
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                let arr2 = parseBatchData(data);
                setBatchData(arr2);
            });
    }, []);

    const background = props.mode === 'management' ? 'bg-secondary' :
        (props.mode === 'student' ? styles['background-student'] : styles['background-teacher']);

    return (
        <div className={`${styles.university} m-5 p-4 ${background}`}>
            <h2>{versityName}</h2>
            <div className='p-2 mt-5'>
                <Accordion flush>
                    <Departments mode={props.mode} userId={props.userId} departments={deptData}/>
                    <Batches mode={props.mode} userId={props.userId} batches={batchData}/>
                </Accordion>
            </div>
        </div>
    );
}

export default UniversityInfo;