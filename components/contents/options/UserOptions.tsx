import {Container, Nav, Offcanvas} from "react-bootstrap";
import {BsFillCaretRightSquareFill, BsFillFilterCircleFill} from "react-icons/bs";
import React, {Fragment, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from './UserOptions.module.scss';
import AuthContext from "../../../store/auth-context";
import {StudentSummary} from "../../../models/University/Student";
import {TeacherSummary} from "../../../models/University/Teacher";
import StudentInfo from "./StudentInfo";
import TeacherInfo from "./TeacherInfo";

const server = 'http://localhost:3000';

const UserOptions: React.FC<{ id: string }> = (props) => {

    const authCtx = useContext(AuthContext);
    const [showSideBar, setShowSideBar] = useState(false);
    const [userId, setUserId] = useState('');
    const [mode, setMode] = useState('');
    const [studentView, setStudentView] = useState<StudentSummary[]>([]);
    const [teacherView, setTeacherView] = useState<TeacherSummary[]>([]);

    useEffect(() => {
        if (!props.id) {
            const order = parseInt(authCtx.loggedOrder);
            setUserId(authCtx.loggedInAs === 'management' ?
                authCtx.loginData.managementRoles[order].ID.toString() :
                (authCtx.loggedInAs === 'student' ? authCtx.loginData.studentRoles[order].ID.toString() :
                    authCtx.loginData.teacherRoles[order].ID.toString()));
        } else {
            setUserId(props.id);
        }

        setMode(authCtx.loggedInAs)

        fetch(`${server}/user/info`, {
            mode: 'cors',
            method: 'get',
            credentials: "include",
        })
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                if (authCtx.loggedInAs === 'student') setStudentView(data);
                else if (authCtx.loggedInAs === 'teacher') setTeacherView(data);
            });

    }, [])

    const handleCloseSideBar = () => setShowSideBar(false);
    const toggleShowSideBar = () => setShowSideBar((s) => !s);

    const router = useRouter();

    const roleHandler = async (e: any) => {
        e.preventDefault();

        await router.push('/login');
    }

    const newsFeed = async (e: React.MouseEvent) => {
        e.preventDefault();

        await router.push(`/${userId}`);
    }

    const allGroups = async (e: React.MouseEvent) => {
        e.preventDefault();

        await router.push(`/${userId}/groups`);
    }

    const universityInfo = async (e: React.MouseEvent) => {
        e.preventDefault();

        await router.push(`/${userId}/uniInfo`);
    }

    const customGroup = async (e: React.MouseEvent) => {
        e.preventDefault();

        await router.push('/groups/addCustom');
    }

    return (
        <Fragment>
            <h2 className='text-light'>
                <BsFillFilterCircleFill onClick={toggleShowSideBar}/>
            </h2>
            <Offcanvas className={`${styles.background} text-light`} show={showSideBar}
                       onHide={handleCloseSideBar} scroll={true}>

                <div className='text-lg-center'>
                    <Offcanvas.Header closeButton closeVariant='white' style={{alignItems: "baseline"}}>
                        <Offcanvas.Title>

                            {mode === 'student' &&
                                <StudentInfo BATCH_YEAR={studentView[0]?.BATCH_YEAR}
                                             DEPARTMENT_NAME={studentView[0]?.DEPARTMENT_NAME}
                                             ROLE_ID={studentView[0]?.ROLE_ID} SECTION_NAME={studentView[0]?.SECTION_NAME}
                                             SECTION_ROLL_NO={studentView[0]?.SECTION_ROLL_NO}
                                             UNIVERSITY_NAME={studentView[0]?.UNIVERSITY_NAME}
                                />}

                            {mode === 'teacher' &&
                                <TeacherInfo ROLE_ID={teacherView[0]?.ROLE_ID}
                                             DEPARTMENT_NAME={teacherView[0]?.DEPARTMENT_NAME}
                                             UNIVERSITY_NAME={teacherView[0]?.UNIVERSITY_NAME}
                                />}

                        </Offcanvas.Title>
                    </Offcanvas.Header>
                </div>

                <Offcanvas.Body>
                    <Container className='text-secondary'>
                        <Nav>
                            <Nav.Link><b onClick={roleHandler}>
                                <BsFillCaretRightSquareFill/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                Change Role</b>
                            </Nav.Link>
                            <Nav.Link><b onClick={universityInfo}>
                                <BsFillCaretRightSquareFill/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                University Info</b>
                            </Nav.Link>
                            <Nav.Link><b onClick={newsFeed}>
                                <BsFillCaretRightSquareFill/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                NewsFeed</b>
                            </Nav.Link>
                            <Nav.Link><b onClick={allGroups}>
                                <BsFillCaretRightSquareFill/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                All Groups</b>
                            </Nav.Link>
                            <Nav.Link><b onClick={customGroup}>
                                <BsFillCaretRightSquareFill/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                Create Custom Group</b>
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </Fragment>
    );
}

export default UserOptions;