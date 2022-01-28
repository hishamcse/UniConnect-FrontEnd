import {Container, Nav, Offcanvas} from "react-bootstrap";
import {BsFillCaretRightSquareFill, BsFillFilterCircleFill} from "react-icons/bs";
import React, {Fragment, useContext, useState} from "react";
import {useRouter} from "next/router";
import styles from './StudentOptions.module.scss';
import AuthContext from "../../../store/auth-context";

const StudentOptions: React.FC<{ id: string }> = (props) => {

    const authCtx = useContext(AuthContext);
    const [showSideBar, setShowSideBar] = useState(false);

    const handleCloseSideBar = () => setShowSideBar(false);
    const toggleShowSideBar = () => setShowSideBar((s) => !s);

    const router = useRouter();

    const newsFeed = async (e: React.MouseEvent) => {
        e.preventDefault();

        await router.push(`/${authCtx.loginData.studentRoles[0].ID}`);
    }

    const allGroups = async (e: React.MouseEvent) => {
        e.preventDefault();

        // await router.push(`${props.id}/addBatch`);
    }

    const universityInfo = async (e: React.MouseEvent) => {
        e.preventDefault();

        await router.push(`${props.id}/uniInfo`);
    }

    let modeName = 'Student ';

    return (
        <Fragment>
            <h2 className='text-light'>
                <BsFillFilterCircleFill onClick={toggleShowSideBar}/>
            </h2>
            <Offcanvas className={`${styles.background} text-light`} show={showSideBar}
                       onHide={handleCloseSideBar} scroll={true}>
                <div className='text-lg-center'>
                    <Offcanvas.Header closeButton closeVariant='white'>
                        <Offcanvas.Title>{modeName}&nbsp;{props.id}</Offcanvas.Title>
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
                        </Nav>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </Fragment>
    );
}

export default StudentOptions;