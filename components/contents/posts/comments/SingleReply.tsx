import React, {useContext} from "react";
import {CommentView} from "../../../../models/Comment";
import {Card, Dropdown, Image} from "react-bootstrap";
import {BiDownvote, BiUpvote} from "react-icons/bi";
import styles from "./Comments.module.scss";
import AuthContext from "../../../../store/auth-context";
import {IconButton} from "@mui/material";
import {FiSettings} from "react-icons/fi";

const server = 'http://localhost:3000';

const SingleReply: React.FC<{ replyData: CommentView, updateReplies: () => void, updateComments: () => void }> = (props) => {

    const authCtx = useContext(AuthContext);

    const voteHandler = (down: string) => {
        fetch(`${server}/votes/${props.replyData.CONTENT_ID}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                down: down,
            })
        }).then(resp => {
            return resp.json();
        }).then(_ => {
            props.updateReplies();
        });
    }

    const upVoteHandler = (e: any) => {
        e.preventDefault();
        voteHandler('N');
    }

    const downVoteHandler = (e: any) => {
        e.preventDefault();
        voteHandler('Y');
    }

    const deleteReplyHandler = (e:any) => {
        e.preventDefault();

        fetch(`${server}/contents/delete/${props.replyData.CONTENT_ID}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: null
        }).then(resp => {
            return resp.json();
        }).then(_ => {
            props.updateComments();
        });
    }

    const showSettings = (props.replyData?.ROLE_ID === authCtx.loginData.studentRoles[0]?.ID) ||
        (props.replyData?.ROLE_ID === authCtx.loginData.teacherRoles[0]?.ID);

    return (
        <Card className={`${styles.reply} border-3 m-2 p-3`}>
            <div className='d-flex'>
                <Card.Subtitle className="mt-3 mb-2 text-success d-flex">
                    <Image src='/id-icon.png' width={25} height={25} alt='id'/>&nbsp;&nbsp;
                    {props.replyData.USERNAME}
                </Card.Subtitle>
                {showSettings &&
                    <div className='mx-2 text-sm-right text-right'>
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-light" size='sm'>
                                <IconButton aria-label="settings">
                                    <FiSettings size='20px'/>
                                </IconButton>
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="dark">
                                <Dropdown.Item onClick={deleteReplyHandler}>
                                    delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>}
            </div>

            <Card.Subtitle className="mb-2 text-muted">
                <div className='d-flex'>
                    <b>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {new Date(props.replyData.POSTED_AT).toLocaleTimeString()
                            + " , " + new Date(props.replyData.POSTED_AT).toDateString()}
                    </b>
                </div>
            </Card.Subtitle>

            <Card.Text className='mt-4 mb-4 d-flex`'>
                <p className='text-left px-4'>
                    {props.replyData.TEXT}
                </p>
            </Card.Text>

            <div className={`text-info`}>
                <div className='d-flex'>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <h6>Upvote ({props.replyData.UPVOTE}) :&nbsp;
                        {props.replyData.DOWN === 'N' &&
                            <b><BiUpvote className={`${styles.hovering} text-black`} onClick={upVoteHandler}/></b>}
                        {props.replyData.DOWN !== 'N' &&
                            <b><BiUpvote className={`${styles.hovering}`} onClick={upVoteHandler}/></b>}
                    </h6>&nbsp;&nbsp;&nbsp;&nbsp;
                    <h6>Downvote ({props.replyData.DOWNVOTE}) :&nbsp;
                        {props.replyData.DOWN === 'Y' &&
                            <b><BiDownvote className={`${styles.hovering} text-black`} onClick={downVoteHandler}/></b>}
                        {props.replyData.DOWN !== 'Y' &&
                            <b><BiDownvote className={`${styles.hovering}`} onClick={downVoteHandler}/></b>}
                    </h6>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <br/>
            </div>
        </Card>
    )
}

export default SingleReply;