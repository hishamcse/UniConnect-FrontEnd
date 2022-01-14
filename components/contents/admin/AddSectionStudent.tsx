import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import styles from "./AddSectionStudent.module.scss";
import styles1 from "./AddDeptBatch.module.scss";
import {Button, Form} from "react-bootstrap";
import {
    BsBuilding,
    BsFillCaretLeftFill,
    BsFillPersonPlusFill,
    BsFillSignpost2Fill
} from "react-icons/bs";
import {Batch} from "../../../models/University/Batch";
import {parseBatchData} from "../../../parseUtils/ParseBatchData";

const server = 'http://localhost:3000';

const AddSectionStudent: React.FC<{ userId: string, batchId: string | string[] | undefined }> = (props) => {

    const [batchData, setBatchData] = useState<Batch[]>([]);
    const [deptName, setDeptName] = useState<string>('');

    const inputStudentCountRef = useRef<HTMLInputElement | null>(null);
    const [formValid, setFormValid] = useState(true);

    const router = useRouter();

    useEffect(() => {
        fetch(`${server}/batches/${props.batchId}`, {
            mode: 'cors',
            method: 'get',
            credentials: "include",
        })
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                console.log(data)
                parseBatchData([]);
                setBatchData(data);
            });
    }, []);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const sectionCount = document.querySelectorAll('input[type=checkbox]:checked').length;
        const studentPerSec = inputStudentCountRef.current?.value;

        if(batchData.length === 0 || !sectionCount || !studentPerSec) {
            setFormValid(false);
            return;
        }

        console.log(batchData[0].BATCH_YEAR, batchData[0].DEPT_NAME, sectionCount, studentPerSec);
        setFormValid(true);

        // post request will be here

        await router.push(`/${props.userId}`);
    }

    const backHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await router.push(`/${props.userId}`);
    }

    const changeDeptHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
        setDeptName(e.target.value);
    }

    const year = batchData.length !== 0 ? batchData[0].BATCH_YEAR : '';
    const batchName = batchData.length !== 0 ? batchData[0].BATCH_NAME: '';
    const depts = batchData.length !== 0 ? batchData.map(data => data.DEPT_NAME.split(',')[1]) : [];
    const sectionCount = deptName.length !== 0 ?
        batchData.find(data => data.DEPT_NAME.split(',')[1] === deptName)?.SECTION_COUNT : '';

    return (
        <div className={styles.body}>
            <Button variant='danger' onClick={backHandler}>
                <BsFillCaretLeftFill/>&nbsp;
                Back
            </Button>

            <Form className={styles1.content} onSubmit={submitHandler}>
                <div className={styles1['form-header']}>
                    <h3>Add Section and Student</h3>
                </div>

                <div className={`${styles1.id}`}>
                    <Form.Floating className="mb-4 mt-5">
                        <Form.Control id="floatingInputCustom"
                                      type="text"
                                      placeholder='2017'
                                      disabled
                        />
                        <label htmlFor="floatingInputCustom">
                            <BsFillSignpost2Fill/>&nbsp;
                            Batch {year} : {batchName}
                        </label>
                    </Form.Floating>
                </div>

                <Form.Group className='d-flex m-3'>
                    <Form.Label className='d-flex pt-2'>
                        <b><BsBuilding/></b>&nbsp;&nbsp;Departments
                    </Form.Label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Form.Control as='select' onChange={changeDeptHandler} value={deptName}>
                        <option key={Math.random()}>Department</option>
                        {depts.map(dept => <option key={Math.random()} value={dept}>{dept}</option>)}
                    </Form.Control>
                </Form.Group>

                <Form.Floating className="mb-2 d-flex">
                    <div className='d-flex m-3'>
                        <Form.Label className='d-flex'>
                            <b><BsBuilding/></b>&nbsp;
                            Section
                        </Form.Label>&nbsp;&nbsp;&nbsp;&nbsp;
                        {sectionCount && [...Array(5)].map((_, i) => {
                            return (i + 1) <= sectionCount ? (<Form.Check
                                inline
                                label={String.fromCharCode(i + 65)}
                                defaultChecked
                                checked
                            />) : (<Form.Check
                                inline
                                label={String.fromCharCode(i + 65)}
                            />)
                        })}
                    </div>
                </Form.Floating>

                <Form.Floating className="mb-4 d-flex">
                    <div className='d-flex m-2'>
                        <Form.Label className='d-flex p-2'>
                            <b><BsFillPersonPlusFill/></b>&nbsp;&nbsp;StudentPerSection
                        </Form.Label>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Form.Control
                            id="floatingInputCustom"
                            type="number"
                            min='1'
                            max='70'
                            ref={inputStudentCountRef}
                        />
                    </div>
                </Form.Floating>

                {!formValid && <p className={styles1['error-text']}>Inputs are not valid!!</p>}

                <Button className={`${styles1.button} mb-4`} variant="info" size="lg" type='submit'>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default AddSectionStudent;