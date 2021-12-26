import React from "react";
import Departments from "./Departments";
import {Accordion} from "react-bootstrap";
import Batches from "./Batches";
import styles from './UniversityInfo.module.scss';

const departments = ['CSE', 'EEE', 'ME', 'BME', 'CE', 'IPE', 'ChE'];
const batches = ['2015', '2016', '2017', '2018']

const UniversityInfo: React.FC<{ mode: string, userId:string }> = (props) => {

    const adminMode: boolean = props.mode === 'admin';

    return (
        <div className={`${styles.university} m-5 p-4 bg-secondary`}>
            <h2>Bangladesh University Of Engineering & Technology</h2>
            <div className='p-2 mt-5'>
                <Accordion flush>
                    <Departments departments={departments} userId={props.userId}/>
                    <Batches batches={batches} userId={props.userId}/>
                </Accordion>
            </div>
        </div>
    );
}

export default UniversityInfo;