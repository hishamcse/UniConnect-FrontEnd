import styles from './AddDeptBatch.module.scss';
import React, {useRef, useState} from "react";
import {useRouter} from "next/router";
import {Button, Form} from "react-bootstrap";
import {BsCalendarCheck, BsFillCaretLeftFill, BsFillSignpost2Fill} from "react-icons/bs";
import ReactDatePicker from "react-datepicker";

const batchNameValidity = (inp: string): boolean => inp.trim() !== '';

const AddBatchNew: React.FC<{ userId: string }> = (props) => {

    const inputBatchNameRef = useRef<HTMLInputElement | null>(null);
    const [formValid, setFormValid] = useState(true);

    const [startDate, setStartDate] = useState(new Date());

    const router = useRouter();

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const batchName = inputBatchNameRef.current?.value;

        if (!batchName || !batchNameValidity(batchName)) {
            setFormValid(false);
            return;
        }

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
                    <h3>Add Batch</h3>
                </div>
                <div>
                    <Form.Floating className="mb-4 mt-5 d-flex">
                        <BsCalendarCheck/>&nbsp;
                        <h6>Batch Year</h6>
                        <ReactDatePicker
                            className={styles.date}
                            selected={startDate}
                            onChange={(date: Date) => setStartDate(date)}
                            showYearPicker
                            dateFormat="yyyy"
                            minDate={new Date(2014, 0)}
                            maxDate={new Date(2025, 0)}
                        />
                    </Form.Floating>
                </div>
                <Form.Floating className="mb-4">
                    <Form.Control
                        id="floatingPasswordCustom"
                        type="text"
                        placeholder="DeptName"
                        ref={inputBatchNameRef}
                    />
                    <label htmlFor="floatingPasswordCustom">
                        <BsFillSignpost2Fill/>&nbsp;
                        Batch Name
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

export default AddBatchNew;