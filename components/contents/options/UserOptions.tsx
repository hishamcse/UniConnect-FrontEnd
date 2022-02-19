import {Container, Nav, Offcanvas} from "react-bootstrap";
import {BsFillCaretRightSquareFill, BsFillFilterCircleFill} from "react-icons/bs";
import React, {Fragment, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from './UserOptions.module.scss';
import AuthContext from "../../../store/auth-context";

const UserOptions: React.FC<{ id: string }> = (props) => {

    const authCtx = useContext(AuthContext);
    const [showSideBar, setShowSideBar] = useState(false);
    const [userId, setUserId] = useState('');
    const [mode, setMode] = useState('');

    useEffect(() => {
        if (!props.id) {
            setUserId(authCtx.loggedInAs === 'management' ? authCtx.loginData.managementRoles[0].ID.toString() :
                (authCtx.loggedInAs === 'student' ? authCtx.loginData.studentRoles[0].ID.toString() :
                    authCtx.loginData.teacherRoles[0].ID.toString()));
        } else {
            setUserId(props.id);
        }

        setMode(authCtx.loggedInAs)
    }, [])

    const handleCloseSideBar = () => setShowSideBar(false);
    const toggleShowSideBar = () => setShowSideBar((s) => !s);

    const router = useRouter();

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
                    <Offcanvas.Header closeButton closeVariant='white'>
                        <Offcanvas.Title>{mode}&nbsp;{props.id}</Offcanvas.Title>
                    </Offcanvas.Header>
                </div>
                <Offcanvas.Body>
                    <Container className='text-secondary'>
                        <Nav>
                            <Nav.Link><b>
                                <BsFillCaretRightSquareFill/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                Update Account Info</b>
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