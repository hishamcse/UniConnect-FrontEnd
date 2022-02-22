import {Container, Nav, Offcanvas} from "react-bootstrap";
import {BsFillCaretRightSquareFill, BsFillFilterCircleFill} from "react-icons/bs";
import React, {Fragment, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from './UserOptions.module.scss';
import AuthContext from "../../../store/auth-context";
import { CSSProperties } from "@emotion/serialize";

const UserOptions: React.FC<{ id: string }> = (props) => {

    const authCtx = useContext(AuthContext);
    const [showSideBar, setShowSideBar] = useState(false);
    const [userId, setUserId] = useState('');
    const [mode, setMode] = useState('');

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
                    <Offcanvas.Header closeButton closeVariant='white' style={{alignItems : "baseline"}}>
                        {/* <Offcanvas.Title>{mode}&nbsp;{props.id}</Offcanvas.Title> */}
                        
                        <Offcanvas.Title>
                            {/* <TeacherInfo DEPARTMENT_NAME="Mechanical Engineering" ROLE_ID={12}
                            UNIVERSITY_NAME = "Bangladesh Univeristy of Engineering and technology"
                            /> */}
                            <StudentInfo BATCH_YEAR={2016} DEPARTMENT_NAME = "Computer Science and Engineering"
                            ROLE_ID={12} SECTION_NAME = {"E"} SECTION_ROLL_NO = {5} UNIVERSITY_NAME = "Bangladesh University Of Engineering And Technology"
                            />
                            {/* <ManagementInfo MANAGEMENT_ID={12} UNIVERSITY_NAME = "Bangladesh University Of Engineering And Technology" /> */}
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


const containerStyle  : React.CSSProperties = {
    display : "flex",
    flexDirection  : "column",
    textAlign : "left",
    padding : "10px", 
    border : "solid 1px white"
}
const itemStyle  : React.CSSProperties = {
    fontSize : "14px",
    padding : "2px"
}


const TeacherInfo : React.FC<{
    ROLE_ID : string | number,
    DEPARTMENT_NAME : string,
    UNIVERSITY_NAME : string
}> = (props)=>{
    return(
        <div style={containerStyle}>
            <div > Teacher </div>
            <div style={itemStyle}> Id : {props.ROLE_ID}</div>

            <div style={itemStyle}> {props.DEPARTMENT_NAME} &nbsp;Department </div>
            <div style={itemStyle} >{props.UNIVERSITY_NAME}</div>
        </div>
    )
}



const StudentInfo : React.FC<{
    ROLE_ID: number | string,
    BATCH_YEAR: number,
    DEPARTMENT_NAME: string,
    SECTION_NAME: string,
    SECTION_ROLL_NO: number | string,
    UNIVERSITY_NAME : string
}> = (props)=>{
    return (
        <div  style = {containerStyle}>
            <div> Student </div>
            <div style={itemStyle}> Id : {props.ROLE_ID}</div>

            <div style = {itemStyle}> {props.DEPARTMENT_NAME} - {props.BATCH_YEAR} Batch </div>
            <div style = {itemStyle}> {props.SECTION_NAME} section. Roll No : {props.SECTION_ROLL_NO} </div>
            <div style = {itemStyle}> {props.UNIVERSITY_NAME}</div>

        </div>
    )
}

const ManagementInfo : React.FC<{
    UNIVERSITY_NAME : string,
    MANAGEMENT_ID : number | string
}> = (props)=>{
    return (
        
        <div style={containerStyle}>
            <div > Management </div>
            <div style={itemStyle}> Id : {props.MANAGEMENT_ID}</div>
            <div style={itemStyle} >{props.UNIVERSITY_NAME}</div>
        </div>
    )
}

export default UserOptions;