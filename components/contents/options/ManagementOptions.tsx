import {Container, Nav, Offcanvas} from "react-bootstrap";
import {BsFillCaretRightSquareFill, BsFillFilterCircleFill} from "react-icons/bs";
import React, {Fragment, useState} from "react";
import {useRouter} from "next/router";

const ManagementOptions: React.FC<{ id: string }> = (props) => {

    const [showSideBar, setShowSideBar] = useState(false);

    const handleCloseSideBar = () => setShowSideBar(false);
    const toggleShowSideBar = () => setShowSideBar((s) => !s);

    const router = useRouter();

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

    let modeName = 'Management ';

    return (
        <Fragment>
            <h2 className='text-light'>
                <BsFillFilterCircleFill onClick={toggleShowSideBar}/>
            </h2>
            <Offcanvas className='bg-dark text-secondary' show={showSideBar}
                       onHide={handleCloseSideBar} scroll={true}>
                <div className='text-lg-center'>
                    <Offcanvas.Header closeButton closeVariant='white'>
                        <Offcanvas.Title>{modeName}&nbsp;{props.id}</Offcanvas.Title>
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