import React, {useState} from "react";
import {useRouter} from "next/router";
import {Button, Form, Image, Spinner} from "react-bootstrap";
import styles from "../signup/SignUpForm.module.scss";
import validator from "validator";
import ReactDatePicker from "react-datepicker";
import {BsCalendarCheck, BsFillCaretLeftFill, BsFillCreditCard2BackFill, BsMailbox2, BsPhoneFill} from "react-icons/bs";
import useInput from "../../hooks/use-input";

const server = 'http://localhost:3000';

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
        value: districtInput,
        hasError: districtInValid,
        isValid: districtIsValid,
        changeHandler: districtChangeHandler,
        blurHandler: districtBlurHandler,
        reset: districtReset
    } = useInput(addressValidity);

    const {
        value: divisionInput,
        hasError: divisionInValid,
        isValid: divisionIsValid,
        changeHandler: divisionChangeHandler,
        blurHandler: divisionBlurHandler,
        reset: divisionReset
    } = useInput(addressValidity);

    const {
        value: postalInput,
        hasError: postalInValid,
        isValid: postalIsValid,
        changeHandler: postalChangeHandler,
        blurHandler: postalBlurHandler,
        reset: postalReset
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [processFail, setProcessFail] = useState(false);

    const router = useRouter();

    let formValid = false;

    if (firstNameIsValid && lastNameIsValid && emailIsValid && phnIsValid &&
        addressIsValid && districtIsValid && divisionIsValid && postalIsValid && passwordIsValid &&
        startDate.getFullYear().toString()) {
        formValid = true;
    }

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formValid) return;
        setIsSubmitting(true);

        const parts = startDate.toLocaleDateString().split('/');
        const newDateString = [parts[1], parts[0], parts[2]].join('/');
        console.log(newDateString);

        fetch(`${server}/user/signup`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                first_name: firstNameInput,
                last_name: lastNameInput,
                house_address: addressInput,
                district: districtInput,
                division: divisionInput,
                postal_code: postalInput,
                email: emailInput,
                phone_number: phnInput,
                date_of_birth: newDateString,
                password: passwordInput
            })
        }).then(async resp => {
            if(resp.status !== 200) throw new Error();
            else {
                firstNameReset();
                lastNameReset();
                emailReset();
                phnReset();
                addressReset();
                divisionReset();
                districtReset();
                postalReset();
                passwordReset();
                await router.push('/');
            }
            return resp.json();
        }).then(_ => {
        }).catch(_ => {
            setProcessFail(true);
        }).finally(async () => {
            setIsSubmitting(false);
        });
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
                    <ReactDatePicker dateFormat="dd/MM/yyyy" className={styles.date} maxDate={new Date(2000, 0)}
                                     selected={startDate} onChange={(date: Date) => setStartDate(date)}/>
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
                        House Address
                    </label>
                    {addressInValid && <p className={styles['error-text']}>Address must not be empty</p>}
                </Form.Floating>

                <Form.Floating className="mt-3">
                    <Form.Control
                        id="floatingInputCustom"
                        type="address"
                        placeholder="Address"
                        value={districtInput}
                        onChange={districtChangeHandler}
                        onBlur={districtBlurHandler}
                    />
                    <label htmlFor="floatingInputCustom">
                        <BsFillCreditCard2BackFill/>&nbsp;
                        District
                    </label>
                    {districtInValid && <p className={styles['error-text']}>district must not be empty</p>}
                </Form.Floating>

                <Form.Floating className="mt-3">
                    <Form.Control
                        id="floatingInputCustom"
                        type="address"
                        placeholder="division"
                        value={divisionInput}
                        onChange={divisionChangeHandler}
                        onBlur={divisionBlurHandler}
                    />
                    <label htmlFor="floatingInputCustom">
                        <BsFillCreditCard2BackFill/>&nbsp;
                        Division
                    </label>
                    {divisionInValid && <p className={styles['error-text']}>division must not be empty</p>}
                </Form.Floating>

                <Form.Floating className="mt-3">
                    <Form.Control
                        id="floatingInputCustom"
                        type="address"
                        placeholder="postal"
                        value={postalInput}
                        onChange={postalChangeHandler}
                        onBlur={postalBlurHandler}
                    />
                    <label htmlFor="floatingInputCustom">
                        <BsFillCreditCard2BackFill/>&nbsp;
                        Postal Code
                    </label>
                    {postalInValid && <p className={styles['error-text']}>postal must not be empty</p>}
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

                <Button className={`${styles.button} mb-1`} variant="info" size="lg" type='submit'
                        disabled={!formValid}>
                    Submit
                </Button>

                {isSubmitting && <Spinner animation='border' variant='danger'/>}
                {processFail && <p className='text-danger'>Server process request failed!!</p>}
            </Form>
        </div>
    );
}

export default SignUpForm;