import React from "react";
import {JoinRequest} from "../../../models/JoinRequest";
import styles from "../posts/comments/Comments.module.scss";
import {Button, Card} from "react-bootstrap";
import {VscRequestChanges} from "react-icons/vsc";

const SingleNotification: React.FC<{ notification: JoinRequest, showReq: (req: JoinRequest) => void }> = (props) => {

    const showRequestHandler = (e:any) => {
        e.preventDefault();
        props.showReq(props.notification);
    }

    return (
        <Card className={`${styles.reply} border-3 m-2 p-2`}>
            <div className='d-flex'>
                <Card.Subtitle className="mt-3 text-success d-flex">
                    <div className='text-dark'>
                        <h4><VscRequestChanges className='text-lg-center'/></h4>
                    </div>
                    <br/>&nbsp;&nbsp;&nbsp;&nbsp;

                    <p>
                        Invitation from
                        <b className='text-lg-center text-muted'> {props.notification.REQUEST_FROM_USER_NAME}</b> to
                        join
                        <b className='text-lg-center text-danger'> {props.notification.GROUP_NAME}</b>
                    </p>
                </Card.Subtitle>
            </div>

            <Card.Body>
                <div className='bg-gradient text-lg-center'>
                    <Button variant='success' className='me-lg-auto' onClick={showRequestHandler}>
                        View full invitation
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default SingleNotification;