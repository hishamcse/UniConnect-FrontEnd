import styles from './AddDeptBatch.module.scss';
import React, {useRef, useState} from "react";
import {useRouter} from "next/router";
import {Button, Form, Spinner} from "react-bootstrap";
import {BsCalendarCheck, BsFillCaretLeftFill, BsFillSignpost2Fill} from "react-icons/bs";
import ReactDatePicker from "react-datepicker";

const server = 'http://localhost:3000';

const batchNameValidity = (inp: string): boolean => inp.trim() !== '';

const AddBatchNew: React.FC<{ userId: string }> = (props) => {

    const inputBatchNameRef = useRef<HTMLInputElement | null>(null);
    const [batchType, setBatchType] = useState<string>('');
    const [startDate, setStartDate] = useState(new Date());
    const [formValid, setFormValid] = useState(true);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const batchName = inputBatchNameRef.current?.value;
        const batchYear = startDate.getFullYear().toString();

        if (!batchName || !batchNameValidity(batchName) || !batchType || !batchYear) {
            setFormValid(false);
            return;
        }

        setFormValid(true);
        setLoading(true);

        fetch(`${server}/batches`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                type: batchType,
                year: batchYear,
                batchName: batchName,
            })
        }).then(async resp => {
            if (resp.status !== 200) throw new Error();
            else await router.push(`/${props.userId}`);
            return resp.json();
        }).then(_ => {
        }).catch(_ => {
            setFormValid(false);
        }).finally(() => {
            setLoading(false);
        })
    }

    const backHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await router.push(`/${props.userId}`);
    }

    const changeBatchTypeHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
        setBatchType(e.target.value);
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

                <Form.Floating className="mb-2 d-flex">
                    <Form.Control as='select' id="floatingCustom" className='p-2' onChange={changeBatchTypeHandler}
                                  value={batchType}>
                        <option key={Math.random()}>Batch Type</option>
                        <option key={Math.random()} value='ug'>UG</option>
                        <option key={Math.random()} value='pg'>PG</option>
                    </Form.Control>
                </Form.Floating>

                {!formValid && <p className={styles['error-text']}>Inputs are not valid or server failed to load request!!</p>}

                <Button className={`${styles.button} mb-4`} variant="info" size="lg" type='submit' disabled={loading}>
                    Submit
                </Button>

                {loading && <Spinner animation='border' variant='danger'/>}
            </Form>
        </div>
    );
}

export default AddBatchNew;