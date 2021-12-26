import styles from './AddDeptBatch.module.scss';
import React, {useRef, useState} from "react";
import {useRouter} from "next/router";
import {Button, Form} from "react-bootstrap";
import {BsBuilding, BsFillCaretLeftFill, BsFillSignpost2Fill} from "react-icons/bs";

const deptValidity = (inp: string): boolean => inp.trim() !== '';

const AddDepartment: React.FC<{ userId: string }> = (props) => {

    const inputDeptIdRef = useRef<HTMLInputElement | null>(null);
    const inputDeptNameRef = useRef<HTMLInputElement | null>(null);
    const [formValid, setFormValid] = useState(true);

    const router = useRouter();

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const deptId = inputDeptIdRef.current?.value;
        const deptName = inputDeptNameRef.current?.value;

        if (!deptId || !deptName || !deptValidity(deptId) || !deptValidity(deptName)) {
            setFormValid(false);
            return;
        }

        console.log(deptId, deptName)

        setFormValid(true);
        await router.push(`/${props.userId}`);
    }

    const backHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await router.push(`/${props.userId}`);
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
                            placeholder="for example: C.S.E"
                            ref={inputDeptIdRef}
                        />
                        <label htmlFor="floatingInputCustom">
                            <BsFillSignpost2Fill/>&nbsp;
                            Department Id
                        </label>
                    </Form.Floating>
                </div>
                <Form.Floating className="mb-4">
                    <Form.Control
                        id="floatingPasswordCustom"
                        type="text"
                        placeholder="DeptName"
                        ref={inputDeptNameRef}
                    />
                    <label htmlFor="floatingPasswordCustom">
                        <BsBuilding/>&nbsp;
                        Department Name
                    </label>
                </Form.Floating>

                {!formValid && <p className={styles['error-text']}>Inputs are not valid!!</p>}

                <Button className={`${styles.button} mb-4`} variant="info" size="lg" type='submit'>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default AddDepartment;