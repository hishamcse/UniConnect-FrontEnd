import {Container, Nav, Offcanvas} from "react-bootstrap";
import {BsFillCaretRightSquareFill, BsFillFilterCircleFill} from "react-icons/bs";
import React, {Fragment, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {ManagementSummary} from "../../../models/University/Management";
import AuthContext from "../../../store/auth-context";
import ManagementInfo from "./ManagementInfo";

const server = 'http://localhost:3000';

const ManagementOptions: React.FC<{ id: string }> = (props) => {

    const [showSideBar, setShowSideBar] = useState(false);
    const [managementView, setManagementView] = useState<ManagementSummary[]>([]);

    const handleCloseSideBar = () => setShowSideBar(false);
    const toggleShowSideBar = () => setShowSideBar((s) => !s);

    const router = useRouter();
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        fetch(`${server}/user/info`, {
            mode: 'cors',
            method: 'get',
            credentials: "include",
        })
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                if (authCtx.loggedInAs === 'management') setManagementView(data);
            });
    }, [])

    const addDept = async (e: React.MouseEvent) => {
        e.preventDefault();

        await router.push(`${props.id}/addDept`);
    }

    const addBatch = async (e: React.MouseEvent) => {
        e.preventDefault();

        await router.push(`${props.id}/addBatch`);
    }

    const universityInfo = async (e: React.MouseEvent) => {
        e.preventDefault();

        await router.push(`${props.id}`);
    }

    return (
        <Fragment>
            <h2 className='text-light'>
                <BsFillFilterCircleFill onClick={toggleShowSideBar}/>
            </h2>
            <Offcanvas className='bg-dark text-secondary' show={showSideBar}
                       onHide={handleCloseSideBar} scroll={true}>
                <div className='text-lg-center'>
                    <Offcanvas.Header closeButton closeVariant='white'>
                        <Offcanvas.Title>
                            <ManagementInfo MANAGEMENT_ID={managementView[0]?.MANAGEMENT_ID}
                            UNIVERSITY_NAME={managementView[0]?.UNIVERSITY_NAME}/>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                </div>
                <Offcanvas.Body>
                    <Container className='text-secondary'>
                        <Nav>
                            <Nav.Link><b onClick={universityInfo}>
                                <BsFillCaretRightSquareFill/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                University Info</b>
                            </Nav.Link>
                            <Nav.Link><b onClick={addDept}>
                                <BsFillCaretRightSquareFill/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                Add Department</b>
                            </Nav.Link>
                            <Nav.Link><b onClick={addBatch}>
                                <BsFillCaretRightSquareFill/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                Add Batch</b>
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </Fragment>
    );
}

export default ManagementOptions;