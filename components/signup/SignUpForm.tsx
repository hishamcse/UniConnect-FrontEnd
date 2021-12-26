import React, {useState} from "react";
import {useRouter} from "next/router";
import {Button, Form, Image} from "react-bootstrap";
import styles from "../signup/SignUpForm.module.scss";
import validator from "validator";
import ReactDatePicker from "react-datepicker";
import {BsCalendarCheck, BsFillCaretLeftFill, BsFillCreditCard2BackFill, BsMailbox2, BsPhoneFill} from "react-icons/bs";
import useInput from "../../hooks/use-input";

const nameValidity = (inp: string): boolean => inp.trim() !== '';
const emailValidity = (inp: string): boolean => inp.trim() !== '' && validator.isEmail(inp.trim());
const phnNoValidity = (inp: string): boolean => inp.trim().length === 11 && validator.isNumeric(inp);
const addressValidity = (inp: string): boolean => inp.trim() !== '';
const passwordValidity = (inp: string): boolean => validator.isStrongPassword(inp);

const SignUpForm = () => {

    const {
        value: firstNameInput,
        hasError: firstNameInValid,
        isValid: firstNameIsValid,
        changeHandler: firstNameChangeHandler,
        blurHandler: firstNameBlurHandler,
        reset: firstNameReset
    } = useInput(nameValidity);

    const {
        value: lastNameInput,
        hasError: lastNameInValid,
        isValid: lastNameIsValid,
        changeHandler: lastNameChangeHandler,
        blurHandler: lastNameBlurHandler,
        reset: lastNameReset
    } = useInput(nameValidity);

    const {
        value: emailInput,
        hasError: emailInValid,
        isValid: emailIsValid,
        changeHandler: emailChangeHandler,
        blurHandler: emailBlurHandler,
        reset: emailReset
    } = useInput(emailValidity);

    const {
        value: phnInput,
        hasError: phnInValid,
        isValid: phnIsValid,
        changeHandler: phnChangeHandler,
        blurHandler: phnBlurHandler,
        reset: phnReset
    } = useInput(phnNoValidity);

    const {
        value: addressInput,
        hasError: addressInValid,
        isValid: addressIsValid,
        changeHandler: addressChangeHandler,
        blurHandler: addressBlurHandler,
        reset: addressReset
    } = useInput(addressValidity);

    const {
        value: passwordInput,
        hasError: passwordInValid,
        isValid: passwordIsValid,
        changeHandler: passwordChangeHandler,
        blurHandler: passwordBlurHandler,
        reset: passwordReset
    } = useInput(passwordValidity);

    const [startDate, setStartDate] = useState(new Date());

    const router = useRouter();

    let formValid = false;

    if (firstNameIsValid && lastNameIsValid && emailIsValid && phnIsValid && addressIsValid && passwordIsValid) {
        formValid = true;
    }

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!formValid) return;

        firstNameReset();
        lastNameReset();
        emailReset();
        phnReset();
        addressReset();
        passwordReset();

        await router.push('/');
    }

    const backHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await router.push('/');
    }

    return (
        <div className={styles.body}>
            <Button variant='danger' onClick={backHandler}>
                <BsFillCaretLeftFill/>&nbsp;
                Back
            </Button>

            <Form className={styles.content} onSubmit={submitHandler}>
                <div className={styles['form-header']}>
                    <h3>SignUp Form</h3>
                </div>

                <Form.Floating className="mt-4">
                    <Form.Control
                        id="floatingInputCustom"
                        type="text"
                        placeholder="firstName"
                        value={firstNameInput}
                        onChange={firstNameChangeHandler}
                        onBlur={firstNameBlurHandler}
                    />
                    <label htmlFor="floatingInputCustom">
                        <Image src='/id-icon.png' width={20} height={20} alt='id' className={styles.idImg}/>
                        First Name
                    </label>
                    {firstNameInValid && <p className={styles['error-text']}>FirstName must not be empty</p>}
                </Form.Floating>

                <Form.Floating className="mt-3">
                    <Form.Control
                        id="floatingInputCustom"
                        type="text"
                        placeholder="lastName"
                        value={lastNameInput}
                        onChange={lastNameChangeHandler}
                        onBlur={lastNameBlurHandler}
                    />
                    <label htmlFor="floatingInputCustom">
                        <Image src='/id-icon.png' width={20} height={20} alt='id' className={styles.idImg}/>
                        Last Name
                    </label>
                    {lastNameInValid && <p className={styles['error-text']}>LastName must not be empty</p>}
                </Form.Floating>

                <Form.Floating className="mt-3">
                    <Form.Control
                        id="floatingInputCustom"
                        type="email"
                        placeholder="Email"
                        value={emailInput}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                    />
                    <label htmlFor="floatingInputCustom">
                        <BsMailbox2/>&nbsp;&nbsp;
                        E-Mail
                    </label>
                    {emailInValid && <p className={styles['error-text']}>Please provide a valid email</p>}
                </Form.Floating>

                <Form.Floating className="mt-3">
                    <Form.Control
                        id="floatingInputCustom"
                        type="number"
                        placeholder="Phn No"
                        value={phnInput}
                        onChange={phnChangeHandler}
                        onBlur={phnBlurHandler}
                    />
                    <label htmlFor="floatingInputCustom">
                        <BsPhoneFill/>&nbsp;
                        Phone Number
                    </label>
                    {phnInValid && <p className={styles['error-text']}>Please provide a valid phone number</p>}
                </Form.Floating>

                <Form.Floating className="mt-3 d-flex">
                    &nbsp;&nbsp;<BsCalendarCheck/>&nbsp;
                    <h6>Date Of Birth</h6>&nbsp;&nbsp;&nbsp;&nbsp;
                    <ReactDatePicker className={styles.date} maxDate={new Date(2000, 0)} selected={startDate}
                                     onChange={(date: Date) => setStartDate(date)}/>
                </Form.Floating>

                <Form.Floating className="mt-3">
                    <Form.Control
                        id="floatingInputCustom"
                        type="address"
                        placeholder="Address"
                        value={addressInput}
                        onChange={addressChangeHandler}
                        onBlur={addressBlurHandler}
                    />
                    <label htmlFor="floatingInputCustom">
                        <BsFillCreditCard2BackFill/>&nbsp;
                        Address
                    </label>
                    {addressInValid && <p className={styles['error-text']}>Address must not be empty</p>}
                </Form.Floating>

                <Form.Floating className="mt-3 mb-4">
                    <Form.Control
                        id="floatingPasswordCustom"
                        type="password"
                        placeholder="Password"
                        value={passwordInput}
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                    />
                    <label htmlFor="floatingPasswordCustom">
                        <Image src='/password-icon.png' width={20} height={20} alt='id' className={styles.passImg}/>
                        Password
                    </label>
                    {passwordInValid && <p className={styles['error-text']}>Please provide a strong password</p>}
                </Form.Floating>
                
                <Button className={`${styles.button} mb-1`} variant="info" size="lg" type='submit' disabled={!formValid}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default SignUpForm;