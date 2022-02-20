import React, {useContext, useEffect, useState} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import Image from "next/image";
import {useRouter} from "next/router";
import {BsFillArrowRightCircleFill} from "react-icons/bs";
import AdminOptions from "../contents/options/AdminOptions";
import UserOptions from "../contents/options/UserOptions";
import AuthContext from "../../store/auth-context";
import styles from './UserNavigation.module.scss';
import {JoinRequest} from "../../models/JoinRequest";
import Notifications from "../contents/notification/Notifications";

const server = 'http://localhost:3000';

const UserNavigation: React.FC<{ id: string }> = (props) => {

    const authCtx = useContext(AuthContext);

    const [modeText, setModeText] = useState<string>();
    const [uniName, setUniName] = useState<string>();
    const [theme, setTheme] = useState<'light' | 'dark' | undefined>();
    const [notifications, setNotifications] = useState<JoinRequest[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        if (authCtx.loggedInAs !== 'management') {
            fetch(`${server}/requests`, {
                mode: 'cors',
                method: 'get',
                credentials: "include",
            })
                .then(resp => {
                    return resp.json();
                })
                .then(data => {
                    setNotifications(data);
                });
        }
    }, [])

    const router = useRouter();

    const logoutHandler = async (e: React.MouseEvent) => {
        e.preventDefault();

        authCtx.logout();
        await router.push('/');
    }

    useEffect(() => {
        let mode = (authCtx.loggedInAs === 'management') ? 'Admin View' :
            (authCtx.loggedInAs === 'student' ? 'Student View' : 'Teacher View');
        setModeText(mode);

        let uni = (authCtx.loggedInAs === 'management') ? authCtx.loginData.managementRoles[0].UNIVERSITY_NAME.split(',')[1] :
            (authCtx.loggedInAs === 'student' ? authCtx.loginData.studentRoles[0].UNIVERSITY_NAME.split(',')[1] :
                authCtx.loginData.teacherRoles[0].UNIVERSITY_NAME.split(',')[1]);
        setUniName(uni);

        let theme = mode === 'Admin View' ? 'dark' :
            (mode === 'Student View' ? styles['background-student'] : styles['background-teacher']);
        // @ts-ignore
        setTheme(theme);
    }, []);

    const showNotificationHandler = (e: any) => {
        e.preventDefault();
        setShowNotifications(true);
    }

    return (
        <Navbar collapseOnSelect className={theme} bg={theme} variant={theme} expand='lg' fixed='top'>
            <Container>
                <Nav.Link>
                    {modeText === 'Admin View' && <AdminOptions id={props.id}/>}
                    {(modeText === 'Student View' || modeText === 'Teacher View') && <UserOptions id={props.id}/>}
                </Nav.Link>

                <col className='col-1'/>

                <Navbar.Brand className='ml-4 text-light'>
                    <h4>
                        <Image src='/title-icon.png' alt='uni' width='30' height='30'/>
                        &nbsp;&nbsp;{uniName}
                    </h4>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                <Navbar.Collapse id="navbarScroll">
                    <col className='col-4'/>
                    <h5 className='text-light'>
                        {modeText}
                    </h5>
                    <col className='col-4'/>
                    <Nav className='me-auto'>

                        {modeText !== 'Admin View' &&
                            <Nav.Link className='text-light' onClick={showNotificationHandler}>
                                <Notifications notifications={notifications}/>
                            </Nav.Link>
                        }&nbsp;&nbsp;&nbsp;

                        <Nav.Link onClick={logoutHandler}>
                            <b>Logout &nbsp;
                                <BsFillArrowRightCircleFill/>
                            </b>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default UserNavigation;