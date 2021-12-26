import {Container, Nav, Navbar} from "react-bootstrap";
import Image from "next/image";
import {useRouter} from "next/router";
import {
    BsFillArrowRightCircleFill
} from "react-icons/bs";
import AdminOptions from "../contents/options/AdminOptions";
import React from "react";

const UserNavigation: React.FC<{ id: string, mode: string }> = (props) => {

    const router = useRouter();

    const logoutHandler = async (e: React.MouseEvent) => {
        e.preventDefault();

        await router.push('/');
    }

    let modeText = (props.mode === 'admin') ? 'Admin Page' : 'User Page';

    return (
        <Navbar collapseOnSelect bg='dark' variant='dark' expand='lg' fixed='top'>
            <Container>
                <Nav.Link>
                    <AdminOptions id={props.id} mode={props.mode}/>
                </Nav.Link>

                <col className='col-1'/>

                <Navbar.Brand className='ml-4 text-light'>
                    <h4>
                        <Image src='/title-icon.png' alt='uni' width='30' height='30'/>
                        &nbsp;&nbsp;BUET
                    </h4>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                <Navbar.Collapse id="navbarScroll">
                    <col className='col-4'/>
                    <h5 className='text-secondary'>
                        {modeText}
                    </h5>
                    <col className='col-4'/>
                    <Nav className='me-auto'>
                        <Nav.Link><b>{props.id}</b></Nav.Link>&nbsp;
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