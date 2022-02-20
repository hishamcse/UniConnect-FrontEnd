import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import styles from "./AddSectionStudent.module.scss";
import styles1 from "./AddDeptBatch.module.scss";
import {Button, Form} from "react-bootstrap";
import {BsBuilding, BsFillCaretLeftFill, BsFillPersonPlusFill, BsFillSignpost2Fill} from "react-icons/bs";
import {Batch} from "../../../models/University/Batch";

const server = 'http://localhost:3000';

type DeptData = {
    deptId: number,
    deptName: string
}

const AddSectionStudent: React.FC<{ userId: string, batchId: string | string[] | undefined }> = (props) => {

    const [batchData, setBatchData] = useState<Batch[]>([]);
    const [deptId, setDeptId] = useState<string>('');
    const [secName, setSecName] = useState<string>('');

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
                setBatchData(data);
            });
    }, []);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const studentPerSec = inputStudentCountRef.current?.value;

        if (batchData.length === 0 || !studentPerSec || !secName) {
            setFormValid(false);
            return;
        }

        setFormValid(true);

        fetch(`${server}/sections`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                batchId: props.batchId,
                departmentId: deptId,
                sectionName: secName,
                studentCount: studentPerSec
            })
        }).then(resp => {
            if (resp.status !== 200) throw new Error();
            return resp.json();
        }).then(async _ => {
            await router.push(`/${props.userId}`);
        }).catch(_ => {
            console.log('sorry!! request failed');
            setFormValid(false);
        })

        // await router.push(`/${props.userId}`);
    }

    const backHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await router.push(`/${props.userId}`);
    }

    const changeDeptHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
        setDeptId(e.target.value);
    }

    const changeSectionNameHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
        setSecName(e.target.value);
    }

    const year = batchData.length !== 0 ? batchData[0]?.BATCH_YEAR : '';
    const batchName = batchData.length !== 0 ? batchData[0]?.BATCH_NAME : '';
    const depts = batchData.length !== 0 ? batchData.map(data => {
        const dept: DeptData = {
            deptId: data.DEPT_ID,
            deptName: data.DEPT_NAME
        };
        return dept;
    }) : [];
    const sectionCount = deptId.length !== 0 ?
        batchData.find(data => data.DEPT_ID.toString() === deptId)?.SECTION_COUNT : '';

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
                    <Form.Control as='select' onChange={changeDeptHandler} value={deptId}>
                        <option key={Math.random()}>Department</option>
                        {depts.map(dept => <option key={Math.random()} value={dept.deptId}>{dept.deptName}</option>)}
                    </Form.Control>
                </Form.Group>

                <Form.Floating className="mb-2 d-flex">
                    <div className='d-flex m-3'>
                        <Form.Label className='d-flex'>
                            <b><BsBuilding/></b>&nbsp;&nbsp;Available Section
                        </Form.Label>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Form.Control as='select' className='p-2' onChange={changeSectionNameHandler}
                                      value={secName}>
                            <option key={Math.random()}>Section</option>
                            {sectionCount !== undefined && [...Array(6)].map((_, i) =>
                                (i + 1) > sectionCount &&
                                <option key={Math.random() + i} value={String.fromCharCode(i + 65)}>
                                    {String.fromCharCode(i + 65)}
                                </option>
                            )}
                        </Form.Control>
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