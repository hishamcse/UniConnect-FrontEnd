import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import styles from "./AddSectionStudent.module.scss";
import styles1 from "./AddDeptBatch.module.scss";
import {Button, Form, Spinner} from "react-bootstrap";
import {BsFillCaretLeftFill, BsFillSignpost2Fill} from "react-icons/bs";
import {Batch} from "../../../models/University/Batch";

const server = 'http://localhost:3000';

const deptIdValidity = (inp: string): boolean => inp.length === 2 && Number.isInteger(parseInt(inp));

const AddDepartmentBatch: React.FC<{ userId: string, batchId: string | string[] | undefined }> = (props) => {

    const inputDeptIdRef = useRef<HTMLInputElement | null>(null);
    const [batchData, setBatchData] = useState<Batch[]>([]);
    const [deptIdValid, setDeptIdValid] = useState(true);
    const [formValid, setFormValid] = useState(true);
    const [loading, setLoading] = useState(false);
    const [reqSuccess, setReqSuccess] = useState(true);

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
    }, [])

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const deptId = inputDeptIdRef.current?.value?.trim();

        if (!deptId || !deptIdValidity(deptId)) {
            setFormValid(false);
            return;
        }

        setLoading(true);

        fetch(`${server}/batchdepts`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                departmentId: deptId,
                batchId: props?.batchId
            })
        }).then(async resp => {
            if (resp.status !== 200) throw new Error();
            else await router.push(`/${props.userId}`);
            return resp.json();
        }).then(_ => {
            setFormValid(true);
            setDeptIdValid(true);
        }).catch(_ => {
            setReqSuccess(false);
        }).finally(() => {
            setLoading(false);
        })
    }

    const backHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await router.push(`/${props.userId}`);
    }

    const changeHandler = (e: any) => {
        e.preventDefault();
        setDeptIdValid(true);
        setFormValid(true);
        setReqSuccess(true);
        setLoading(false);
    }

    return (
        <div className={styles.body}>
            <Button variant='danger' onClick={backHandler}>
                <BsFillCaretLeftFill/>&nbsp;
                Back
            </Button>

            <Form className={styles1.content} onSubmit={submitHandler}>
                <div className={styles1['form-header']}>
                    <h3>Add Department For Batch {batchData[0]?.BATCH_YEAR} : {batchData[0]?.BATCH_NAME}</h3>
                </div>
                <div className={`${styles1.id}`}>
                    <Form.Floating className="mb-4 mt-5">
                        <Form.Control
                            id="floatingInputCustom"
                            type="number"
                            min={1} max={100}
                            placeholder="for example: 02"
                            ref={inputDeptIdRef}
                            onChange={changeHandler}
                        />
                        <label htmlFor="floatingInputCustom">
                            <BsFillSignpost2Fill/>&nbsp;
                                Department Id
                        </label>
                    </Form.Floating>
                </div>

                {!formValid && <p className={styles['error-text']}>Dept Code is not valid!!</p>}
                {!deptIdValid && <p className={styles['error-text']}>Department id does not exist!!</p>}
                {!reqSuccess && <p className={styles['error-text']}>Server failed to process request!!</p>}

                <Button className={`${styles.button} mb-4`} variant="info" size="lg" type='submit' disabled={loading}>
                    Submit
                </Button>

                {loading && <Spinner animation='border' variant='danger'/>}
            </Form>
        </div>
    );
}

export default AddDepartmentBatch;