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
        let uniId: number;
        if (authCtx.loggedInAs === 'management') {
            uniName = authCtx.loginData.managementRoles[0].UNIVERSITY_NAME;
            uniId = authCtx.loginData.managementRoles[0].UNIVERSITY_ID;
        } else if (authCtx.loggedInAs === 'student') {
            uniName = authCtx.loginData.studentRoles[0].UNIVERSITY_NAME;
            uniId = authCtx.loginData.studentRoles[0].UNIVERSITY_ID;
        } else {
            uniName = authCtx.loginData.teacherRoles[0].UNIVERSITY_NAME;
            uniId = authCtx.loginData.teacherRoles[0].UNIVERSITY_ID;
        }

        setVersityName(uniName);
        fetch(`${server}/university/${uniId}/depts`, {
            mode: 'cors',
            method: 'get',
            credentials: "include",
        })
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                // console.log(data);
                let arr = parseDeptData(data);
                setDeptData(arr);
            });

        fetch(`${server}/departments`, {
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

    return (
        <div className={`${styles.university} m-5 p-4 bg-secondary`}>
            <h2>{versityName}</h2>
            <div className='p-2 mt-5'>
                <Accordion flush>
                    <Departments departments={deptData} userId={props.userId}/>
                    <Batches batches={batchData} userId={props.userId}/>
                </Accordion>
            </div>
        </div>
    );
}

export default UniversityInfo;