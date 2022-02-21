import styles from './AddDeptBatch.module.scss';
import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {Button, Form, Spinner} from "react-bootstrap";
import {BsBuilding, BsFillCaretLeftFill, BsFillSignpost2Fill} from "react-icons/bs";

const server = 'http://localhost:3000';

const deptIdValidity = (inp: string): boolean => inp.length === 2 && Number.isInteger(parseInt(inp));
const deptNameValidity = (inp: string): boolean => inp.length >= 10;

const AddDepartment: React.FC<{ userId: string }> = (props) => {

    const inputDeptIdRef = useRef<HTMLInputElement | null>(null);
    const inputDeptNameRef = useRef<HTMLInputElement | null>(null);
    const [deptCodes, setDeptCodes] = useState<string[]>([]);
    const [deptCodeValid, setDeptCodeValid] = useState(true);
    const [formValid, setFormValid] = useState(true);
    const [loading, setLoading] = useState(false);
    const [reqSuccess, setReqSuccess] = useState(true);

    const router = useRouter();

    useEffect(() => {
        fetch(`${server}/departments/deptcodes`, {
            mode: 'cors',
            method: 'get',
            credentials: "include",
        })
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                if (data.deptCodes && data.deptCodes.length != 0) {
                    setDeptCodes(data.deptCodes);
                }
            });
    }, [])

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const deptId = inputDeptIdRef.current?.value?.trim();
        const deptName = inputDeptNameRef.current?.value?.trim();

        if (!deptId || !deptName || !deptIdValidity(deptId) || !deptNameValidity(deptName)) {
            setFormValid(false);
            return;
        }

        if (deptCodes.length !== 0 && deptCodes.map(code => code[0]).includes(deptId)) {
            setDeptCodeValid(false);
            return;
        }

        setLoading(true);

        fetch(`${server}/departments`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                deptCode: deptId,
                deptName: deptName
            })
        }).then(async resp => {
            if (resp.status !== 200) throw new Error();
            else await router.push(`/${props.userId}`);
            return resp.json();
        }).then(async _ => {
        }).catch(_ => {
            setReqSuccess(false);
        }).finally(() => {
            setFormValid(true);
            setDeptCodeValid(true);
            setLoading(false);
        })
    }

    const backHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await router.push(`/${props.userId}`);
    }

    const changeHandler = (e: any) => {
        e.preventDefault();
        setDeptCodeValid(true);
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
            <Form className={styles.content} onSubmit={submitHandler}>
                <div className={styles['form-header']}>
                    <h3>Add Department</h3>
                </div>
                <div className={`${styles.id}`}>
                    <Form.Floating className="mb-4 mt-5">
                        <Form.Control
                            id="floatingInputCustom"
                            type="text"
                            placeholder="for example: 02"
                            ref={inputDeptIdRef}
                            onChange={changeHandler}
                        />
                        <label htmlFor="floatingInputCustom">
                            <BsFillSignpost2Fill/>&nbsp;
                            Department Code
                        </label>
                    </Form.Floating>
                </div>

                <Form.Floating className="mb-4">
                    <Form.Control
                        id="floatingPasswordCustom"
                        type="text"
                        placeholder="DeptName"
                        ref={inputDeptNameRef}
                        onChange={changeHandler}
                    />
                    <label htmlFor="floatingPasswordCustom">
                        <BsBuilding/>&nbsp;
                        Department FullName
                    </label>
                </Form.Floating>

                {!formValid && <p className={styles['error-text']}>Inputs are not valid!!</p>}
                {!deptCodeValid && <p className={styles['error-text']}>Department code already exists!!</p>}
                {!reqSuccess && <p className={styles['error-text']}>Server failed to process request!!</p>}

                <Button className={`${styles.button} mb-4`} variant="info" size="lg" type='submit' disabled={loading}>
                    Submit
                </Button>

                {loading && <Spinner animation='border' variant='danger'/>}
            </Form>
        </div>
    );
}

export default AddDepartment;