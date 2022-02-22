import styles from './LoginMode.module.scss';
import React, {useContext, useState} from "react";
import AuthContext from "../../store/auth-context";
import {Button, Container, Spinner} from "react-bootstrap";
import {useRouter} from "next/router";
import RoleClaim from "./RoleClaim";

const server = 'http://localhost:3000';

let managementMode: boolean, studentMode: boolean, teacherMode: boolean;

const LoginMode = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [claimForm, setClaimForm] = useState(false);

    const authCtx = useContext(AuthContext);
    const authData = authCtx.loginData;

    const router = useRouter();

    managementMode = false;
    studentMode = false;
    teacherMode = false;

    if (authData.managementRoles.length !== 0) {
        managementMode = true;
    }

    if (authData.studentRoles.length !== 0) {
        studentMode = true;
    }

    if (authData.teacherRoles.length !== 0) {
        teacherMode = true;
    }

    const fetchReqHandler = (reqType: string, order: string) => {
        authCtx.setLoggedInAs(reqType);
        authCtx.setLoggedInOrder(order);

        setIsSubmitting(true);

        const loggedOrder = parseInt(order);

        let id: number;
        if (reqType === 'management') id = authData?.managementRoles[loggedOrder].ID;
        else if (reqType === 'student') id = authData?.studentRoles[loggedOrder].ID;
        else id = authData?.teacherRoles[loggedOrder].ID;

        fetch(`${server}/${reqType + 's'}/login/${id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(resp => {
            return resp.json();
        }).then(data => {
            console.log(data);
            router.push(`/${id}`).then();
        }).finally(async () => {
            setIsSubmitting(false);
        });
    }

    const managementReqHandler = (e: any) => {
        e.preventDefault();
        fetchReqHandler('management', e.target.closest('Button')?.value);
    }

    const studentReqHandler = (e: any) => {
        e.preventDefault();
        fetchReqHandler('student', e.target.closest('Button')?.value);
    }

    const teacherReqHandler = (e: any) => {
        e.preventDefault();
        fetchReqHandler('teacher', e.target.closest('Button')?.value);
    }

    const claimShowHandler = (e: any) => {
        e.preventDefault();
        setClaimForm(true);
    }

    const claimHideHandler = (e: any) => {
        e.preventDefault();
        setClaimForm(false);
    }

    return (
        <div className={styles.body}>
            <Container className={styles.content}>
                <div className={styles.header}>
                    <h3>Select Your Role to continue:</h3>
                </div>

                <div className='d-flex p-2 m-3'>
                    {managementMode && authData.managementRoles.map((data, index) =>
                        <Button className={`${styles.button} m-2`} variant="success" type='submit'
                                onClick={managementReqHandler} key={index + Math.random()} value={index}>
                            <p className='text-center p-1'>
                                <h4>Management</h4><b className='text-dark'>{data.UNIVERSITY_NAME}</b>
                            </p>&nbsp;&nbsp;
                        </Button>
                    )}

                    {studentMode && authData.studentRoles.map((data, index) =>
                        <Button className={`${styles.button} m-2`} variant="success" type='submit'
                                onClick={studentReqHandler} key={index + Math.random()} value={index}>
                            <p className='text-center p-1'>
                                <h4>Student</h4> <b className='text-info'>{data.DEPARTMENT_NAME}</b>
                                <br/>
                                <b className='text-dark'>{data.UNIVERSITY_NAME}</b>
                            </p>&nbsp;&nbsp;
                        </Button>
                    )}

                    {teacherMode && authData.teacherRoles.map((data, index) =>
                        <Button className={`${styles.button} m-2`} variant="success" type='submit'
                                onClick={teacherReqHandler} key={index + Math.random()} value={index}>
                            <p className='text-center p-1'>
                                <h4>Teacher</h4> <b className='text-info'>{data.DEPARTMENT_NAME}</b>
                                <br/>
                                <b className='text-dark'>{data.UNIVERSITY_NAME}</b>
                            </p>&nbsp;&nbsp;
                        </Button>
                    )}

                    {isSubmitting && <Spinner animation="border" variant="danger"/>}
                </div>

                {!claimForm &&
                    <div className='text-center m-2'>
                        <Button variant="dark" onClick={claimShowHandler}>Claim Role!!</Button>
                    </div>}

            </Container>

            {claimForm && <div className='text-center m-2'>
                <Button variant="info" onClick={claimHideHandler}>Hide Form</Button>
            </div>}

            {claimForm &&
                <div className={`${styles.claimFormContent} text-center`}>
                    <RoleClaim/>
                </div>
            }
        </div>
    )
}

export default LoginMode;