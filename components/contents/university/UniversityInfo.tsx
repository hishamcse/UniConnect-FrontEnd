import React, {useEffect, useState} from "react";
import Departments from "./Departments";
import {Accordion} from "react-bootstrap";
import Batches from "./Batches";
import styles from './UniversityInfo.module.scss';
import {parseDeptData} from "../../../parseUtils/ParseDeptData";
import {DeptInfoView} from "../../../models/University/Department";
import {BatchInfoView} from "../../../models/University/Batch";
import {parseBatchData} from "../../../parseUtils/ParseBatchData";

const batches = ['2015', '2016', '2017', '2018']
const server = 'http://localhost:3000';

const UniversityInfo: React.FC<{ mode: string, userId: string }> = (props) => {

    const [versityName, setVersityName] = useState<string>();
    const [deptData, setDeptData] = useState<DeptInfoView[]>([]);
    const [batchData, setBatchData] = useState<BatchInfoView[]>([]);


    useEffect(() => {
        fetch(`${server}/user/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                id: "1-201",
                password: "password"
            })
        }).then(resp => {
            return resp.json();
        }).then(data => {
            console.log(data);
            setVersityName(data.STUDENT_UNIVERSITY_NAME);
            fetch(`${server}/uni/depts/${data.UNIVERSITY_ID}`, {
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
                    let arr2 = parseBatchData(data);
                    setBatchData(arr2);
                })
        })
    }, [deptData,batchData]);

    const adminMode: boolean = props.mode === 'admin';

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