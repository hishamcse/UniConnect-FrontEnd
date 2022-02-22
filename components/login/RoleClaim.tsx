import React, {useRef, useState} from "react";
import styles from "./LoginMode.module.scss";
import {Button, Form, Spinner} from "react-bootstrap";
import {BsFillSignpost2Fill} from "react-icons/bs";
import {useRouter} from "next/router";

const server = 'http://localhost:3000';

const RoleClaim:React.FC = (props) => {

    const inputRoleIdRef = useRef<HTMLInputElement | null>(null);
    const inputTokenRef = useRef<HTMLInputElement | null>(null);

    const [formValid, setFormValid] = useState(true);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const roleID = inputRoleIdRef.current?.value;
        const token = inputTokenRef.current?.value;

        if (!roleID || !token) {
            setFormValid(false);
            return;
        }

        setFormValid(true);
        setLoading(true);

        fetch(`${server}/roles/claim/${roleID}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                token: token,
            })
        }).then(async resp => {
            if (resp.status !== 200) throw new Error();
            else await router.push('/');
            return resp.json();
        }).then(_ => {
        }).catch(_ => {
            setFormValid(false);
        }).finally(() => {
            setLoading(false);
        })
    }

    const changeHandler = (e:any) => {
        setFormValid(true);
    }

    return (
            <Form className={`m-2 text-center`} onSubmit={submitHandler}>
                <div className={styles['form-header']}>
                    <h3>Claim Role</h3>
                </div>

                <Form.Floating className="mb-4">
                    <Form.Control
                        id="floatingCustom"
                        type="number"
                        placeholder="Role Id"
                        ref={inputRoleIdRef}
                        onChange={changeHandler}
                    />
                    <label htmlFor="floatingCustom">
                        <BsFillSignpost2Fill/>&nbsp;
                        Role Id
                    </label>
                </Form.Floating>

                <Form.Floating className="mb-4">
                    <Form.Control
                        id="floatingCustom2"
                        type="text"
                        placeholder="Enter token"
                        ref={inputTokenRef}
                        onChange={changeHandler}
                    />
                    <label htmlFor="floatingCustom2">
                        <BsFillSignpost2Fill/>&nbsp;
                        Token
                    </label>
                </Form.Floating>

                {!formValid && <p className={styles['error-text']}>Server failed to load request or data is invalid!!</p>}

                <Button className={`${styles.button} mb-4`} variant="info" size="lg" type='submit' disabled={loading}>
                    Submit
                </Button>

                {loading && <Spinner animation='border' variant='danger'/>}
            </Form>
    );
}

export default RoleClaim;