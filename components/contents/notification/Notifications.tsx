import React, {useContext, useEffect, useState} from "react";
import {JoinRequest} from "../../../models/JoinRequest";
import styles from "./Notifications.module.scss";
import {Button, Container, Offcanvas} from "react-bootstrap";
import SingleNotification from "./SingleNotification";
import {Badge, Card, CardActionArea, CardActions, CardContent, Modal, Typography} from "@mui/material";
import {RiNotification2Fill} from "react-icons/ri";
import {useRouter} from "next/router";
import AuthContext from "../../../store/auth-context";

const server = 'http://localhost:3000';

const Notifications: React.FC<{ notifications: JoinRequest[] }> = (props) => {

    const router = useRouter();
    const authCtx = useContext(AuthContext);

    const [userId, setUserId] = useState('');
    const [showSideBar, setShowSideBar] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [request, setRequest] = useState<JoinRequest>();

    useEffect(() => {
        const loggedOrder = parseInt(authCtx.loggedOrder);
        setUserId(authCtx.loggedInAs === 'management' ? authCtx.loginData.managementRoles[loggedOrder].ID.toString() :
            (authCtx.loggedInAs === 'student' ? authCtx.loginData.studentRoles[loggedOrder].ID.toString() :
                authCtx.loginData.teacherRoles[loggedOrder].ID.toString()));
    }, [])

    const handleCloseSideBar = () => setShowSideBar(false);
    const toggleShowSideBar = () => setShowSideBar((s) => !s);

    const handleClose = () => {
        setOpenModal(false);
    }

    const showRequest = (req: JoinRequest) => {
        setShowSideBar(false);
        setOpenModal(true);
        setRequest(req);
    }

    const accept = async (e: any) => {
        e.preventDefault();
        setOpenModal(false);

        fetch(`${server}/requests/${request?.REQUEST_ID}/yes`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: null
        }).then(resp => {
            return resp.json();
        }).then(_ => {
        })

        await router.push(`/${userId}/groups`);
    }

    const reject = async (e: any) => {
        e.preventDefault();
        setOpenModal(false);

        fetch(`${server}/requests/${request?.REQUEST_ID}/no`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: null
        }).then(resp => {
            return resp.json();
        }).then(_ => {
        })

        await router.push(`/${userId}/groups`);
    }

    return (
        <div>
            <h5><b>
                <Badge badgeContent={props.notifications.length === 0 ? '' : props.notifications.length}
                       color="success" max={10} onClick={toggleShowSideBar}>
                    <RiNotification2Fill/>
                </Badge>
            </b></h5>

            <Offcanvas className={`${styles.background} text-light`} show={showSideBar}
                       onHide={handleCloseSideBar} scroll={true} placement='end'>
                <div className='text-lg-center'>
                    <Offcanvas.Header closeButton closeVariant='white'>
                        <Offcanvas.Title>Notifications</Offcanvas.Title>
                    </Offcanvas.Header>
                </div>

                <Offcanvas.Body>
                    <Container className='text-secondary'>
                        {props.notifications.map((item, id) =>
                            <SingleNotification notification={item} key={id + Math.random().toString()}
                                                showReq={showRequest}/>
                        )}
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>

            <div className='text-center'>
                <Modal
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className={`${styles.modal} text-light text-center p-4`}
                    open={openModal}
                >
                    <Card className={`${styles.card} p-2`}>
                        <CardActionArea>
                            <CardContent className='text-light'>
                                <Typography gutterBottom variant="h6" component="div">
                                    Invitation to join <b className='text-info'>{request?.GROUP_NAME}</b>
                                </Typography>

                                <Typography variant="body2" color="text.light">
                                    <h5>Invitation from <b className='text-info'>{request?.REQUEST_FROM_USER_NAME}</b>
                                    </h5>
                                    <h5>{request?.STUDENT_DEPARTMENT_NAME !== null ? 'Student of ' : 'Teacher of '}
                                        <b className='text-info'>{request?.STUDENT_DEPARTMENT_NAME || request?.TEACHER_DEPARTMENT_NAME}</b>
                                    </h5>
                                    <h5>{request?.STUDENT_UNIVERSITY_NAME !== null ?
                                        <b className='text-info'>{request?.STUDENT_UNIVERSITY_NAME}</b> :
                                        <b className='text-info'>{request?.TEACHER_UNIVERSITY_NAME}</b>}
                                    </h5>
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                        <div className='bg-gradient p-2'>
                            <CardActions className={`${styles.button}`}>
                                <Button variant='dark' className={`${styles.hovering} me-lg-auto`} onClick={accept}>
                                    Accept Invitation!
                                </Button>
                                <Button variant='dark' className={`${styles.hovering} me-lg-auto`} onClick={reject}>
                                    Decline Invitation!
                                </Button>
                            </CardActions>
                        </div>
                    </Card>
                </Modal>
            </div>

        </div>
    )
}

export default Notifications;