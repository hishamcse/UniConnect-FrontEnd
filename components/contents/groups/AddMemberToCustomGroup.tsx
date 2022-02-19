import React, {useRef, useState} from "react";
import {useRouter} from "next/router";
import styles from "./AllGroups.module.scss";
import {Button, Form, Spinner} from "react-bootstrap";
import {BsFillCaretLeftFill, BsFillSignpost2Fill} from "react-icons/bs";
import {CgDetailsMore} from "react-icons/cg";

const server = 'http://localhost:3000';

const AddMemberToCustomGroup: React.FC<{ grpId: string, grpName: string }> = (props) => {

    const inputMembersRef = useRef<HTMLTextAreaElement | null>(null);

    const [lengthInvalid, setLengthInvalid] = useState(false);
    const [memberInvalid, setMemberInvalid] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const body = inputMembersRef.current?.value;

        if (!body || body?.trim().length < 1) {
            setLengthInvalid(true);
            return;
        }

        setLengthInvalid(false);

        const strings = body.split(',');
        let invalidNumber: boolean = strings.some(member => !Number.isInteger(parseInt(member)));
        const members = strings.map(str => parseInt(str));

        if (invalidNumber) {
            setMemberInvalid(true);
            return;
        }

        setLoading(true);

        fetch(`${server}/requests/${props.grpId}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                newMembers: members
            })
        }).then(resp => {
            return resp.json();
        }).then(_ => {
        }).finally(() => {
            setLoading(false);
        })

        await router.back();
    }

    const hideErrorHandler = () => {
        setLengthInvalid(false);
        setMemberInvalid(false);
    }

    const backHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await router.back();
    }

    return (
        <div className={styles.body}>
            <Button variant='danger' onClick={backHandler}>
                <BsFillCaretLeftFill/>&nbsp;
                Back
            </Button>

            <Form className={`${styles.content} text-center`} onSubmit={submitHandler} onChange={hideErrorHandler}>
                <div className={styles['form-header']}>
                    <h4>Add Member to custom group</h4>
                </div>

                <div className={`${styles.id}`}>
                    <Form.Group className="mb-4 mt-5">
                        <label htmlFor="floatingInputCustom">
                            <BsFillSignpost2Fill/>&nbsp;
                            <b>Name of your group</b>
                        </label>
                        <Form.Control className='mt-2'
                                      id="floatingInputCustom"
                                      type="text"
                                      placeholder={props?.grpName}
                                      disabled
                        />
                    </Form.Group>
                </div>

                <Form.Group className="mb-4">
                    <label htmlFor="floatingBodyCustom">
                        <CgDetailsMore/>&nbsp;
                        <b>Add members to join your group (Use only ids)</b>
                    </label>
                    <Form.Control className='mt-2'
                                  as='textarea' rows={7} id="floatingBodyCustom"
                                  placeholder="Member ids separated by comma"
                                  ref={inputMembersRef}
                    />
                </Form.Group>

                {lengthInvalid && <p className='text-danger'>
                    Warning!! Group Name must consist of at least 3 letters and least member count is 1</p>}

                {memberInvalid && <p className='text-danger'>
                    Warning!! You must have to enter valid number as member ids</p>}

                <Button className={`${styles.button} mb-2`} variant="info" size="lg" type='submit'>
                    Submit
                </Button>

                {loading && <Spinner animation='border' variant='secondary'/>}
            </Form>
        </div>
    )
}

export default AddMemberToCustomGroup;