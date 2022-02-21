import React, {useState} from "react";
import {useRouter} from "next/router";
import styles from "./AddSectionStudent.module.scss";
import styles1 from "./AddDeptBatch.module.scss";
import {Button, Form} from "react-bootstrap";
import {BsFillCaretLeftFill} from "react-icons/bs";

const server = 'http://localhost:3000';

const AddTeacher: React.FC<{ userId: string, deptId: string | string[] | undefined, deptName: string | string[] | undefined }> = (props) => {

    const [rank, setRank] = useState<string>('');

    const router = useRouter();

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        fetch(`${server}/teachers/create`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                departmentId: props.deptId,
                rank: rank
            })
        }).then(resp => {
            if (resp.status !== 200) throw new Error();
            return resp.json();
        }).then(_ => {
        }).catch(_ => {
            console.log('sorry!! request failed');
        })

        await router.push(`/${props.userId}`);
    }

    const backHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await router.push(`/${props.userId}`);
    }

    const changeRankHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
        setRank(e.target.value);
    }

    return (
        <div className={styles.body}>
            <Button variant='danger' onClick={backHandler}>
                <BsFillCaretLeftFill/>&nbsp;
                Back
            </Button>

            <Form className={styles1.content} onSubmit={submitHandler}>
                <div className={styles1['form-header']}>
                    <h3>Add Faculty For {props.deptName}</h3>
                </div>
                <div className={`${styles1.id}`}>
                    <Form.Group className="mb-4 mt-5">
                        <Form.Control
                            as='select'
                            onChange={changeRankHandler}
                            value={rank}
                        >
                            <option key={Math.random()}>Rank</option>
                            <option value="Lecturer">Lecturer</option>
                            <option value="Assistant Professor">Assistant Professor</option>
                            <option value="Associate Professor">Associate Professor</option>
                            <option value="Professor">Professor</option>
                        </Form.Control>
                    </Form.Group>
                </div>

                <Button className={`${styles.button} mb-4`} variant="info" size="lg" type='submit'>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default AddTeacher;