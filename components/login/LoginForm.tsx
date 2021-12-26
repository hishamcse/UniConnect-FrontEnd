import styles from './LoginForm.module.scss';
import {Form, Image, Button} from "react-bootstrap";
import React, {useRef, useState} from "react";
import {useRouter} from "next/router";

const idValidity = (inp: string): boolean => inp.trim() !== '';
const passwordValidity = (inp: string): boolean => inp.trim().length >= 6;

const LoginForm = () => {

    const inputIdRef = useRef<HTMLInputElement | null>(null);
    const inputPasswordRef = useRef<HTMLInputElement | null>(null);
    const [formValid, setFormValid] = useState(true);

    const router = useRouter();

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const id = inputIdRef.current?.value;
        const password = inputPasswordRef.current?.value;

        if (!id || !password || !idValidity(id) || !passwordValidity(password)) {
            setFormValid(false);
            return;
        }

        console.log(id, password)

        setFormValid(true);
        await router.push(`/${id}`);
    }

    return (
        <Form className={styles.content} onSubmit={submitHandler}>
            <div className={styles['form-header']}>
                <h3>Login Form</h3>
            </div>
            <div className={`${styles.id}`}>
                <Form.Floating className="mb-4 mt-5">
                    <Form.Control
                        id="floatingInputCustom"
                        type="text"
                        placeholder="id"
                        ref={inputIdRef}
                    />
                    <label htmlFor="floatingInputCustom">
                        <Image src='/id-icon.png' width={20} height={20} alt='id' className={styles.idImg}/>
                        ID
                    </label>
                </Form.Floating>
            </div>
            <Form.Floating className="mb-4">
                <Form.Control
                    id="floatingPasswordCustom"
                    type="password"
                    placeholder="Password"
                    ref={inputPasswordRef}
                />
                <label htmlFor="floatingPasswordCustom">
                    <Image src='/password-icon.png' width={20} height={20} alt='id' className={styles.passImg}/>
                    Password
                </label>
            </Form.Floating>

            {!formValid && <p className={styles['error-text']}>Inputs are not valid!!</p>}

            <Button className={`${styles.button} mb-4`} variant="info" size="lg" type='submit'>
                Submit
            </Button>
        </Form>
    );
}

export default LoginForm;