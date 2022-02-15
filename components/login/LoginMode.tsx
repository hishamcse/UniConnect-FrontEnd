import styles from './LoginMode.module.scss';
import React, {useContext, useState} from "react";
import AuthContext from "../../store/auth-context";
import {Button, Container, Spinner} from "react-bootstrap";
import {useRouter} from "next/router";

const server = 'http://localhost:3000';

let adminMode: boolean, studentMode: boolean, teacherMode: boolean;

const LoginMode = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const authCtx = useContext(AuthContext);
    const authData = authCtx.loginData;

    const router = useRouter();

    adminMode = false;
    studentMode = false;
    teacherMode = false;

    if (authData.managementRoles.length !== 0) {
        adminMode = true;
    }

    if (authData.studentRoles.length !== 0) {
        studentMode = true;
    }

    if (authData.teacherRoles.length !== 0) {
        teacherMode = true;
    }

    const fetchReqHandler = (reqType: string) => {
        authCtx.setLoggedInAs(reqType);

        setIsSubmitting(true);

        let id;
        if(reqType === 'management') id = authData.managementRoles[0].ID;
        else if(reqType === 'student') id = authData.studentRoles[0].ID;
        else id = authData.teacherRoles[0].ID;

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
            router.push(`/${authData.personInfo.personId}`).then();
        }).finally(async () => {
            setIsSubmitting(false);
        });
    }

    const managementReqHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        fetchReqHandler('management');
    }

    const studentReqHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        fetchReqHandler('student');
    }

    const teacherReqHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        fetchReqHandler('teacher');
    }

    return (
        <div className={styles.body}>
            <Container className={styles.content}>
                <div className={styles.header}>
                    <h3>Select Your Role to continue:</h3>
                </div>

                <div className='d-flex p-2 m-3'>
                    {adminMode && <Button className={styles.button} variant="success" type='submit'
                                          onClick={managementReqHandler}>
                        Admin
                    </Button>}
                    &nbsp;&nbsp;
                    {studentMode &&
                        <Button className={styles.button} variant="success" type='submit' onClick={studentReqHandler}>
                            Student
                        </Button>}
                    &nbsp;&nbsp;
                    {teacherMode &&
                        <Button className={styles.button} variant="success" type='submit' onClick={teacherReqHandler}>
                            Teacher
                        </Button>}
                    &nbsp;&nbsp;
                    {isSubmitting && <Spinner animation="border" variant="danger"/>}
                </div>
            </Container>
        </div>
    )
}

export default LoginMode;