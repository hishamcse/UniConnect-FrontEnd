import React, {useContext, useEffect, useState} from "react";
import {SinglePostView} from "../../../../models/SinglePost";
import styles from './FullView.module.scss';
import {Button, Card, Form} from "react-bootstrap";
import AuthContext from "../../../../store/auth-context";
import {BiDownvote, BiUpvote} from "react-icons/bi";
import {CommentView} from "../../../../models/Comment";
import SingleComment from "../comments/SingleComment";
import {GiTeacher} from "react-icons/gi";
import {BsFillCalendar2RangeFill, BsFillPersonFill, BsPersonLinesFill} from "react-icons/bs";

const server = 'http://localhost:3000';

const Post: React.FC<{ postData: SinglePostView, updatePost: () => void }> = (props) => {

    const authCtx = useContext(AuthContext);
    const [title, setTitle] = useState<string>('');
    const [posted_by, setPostedBy] = useState<string>('');
    const [posted_at, setPostedAt] = useState<string>('');
    const [contentId, setContentId] = useState<number>();
    const [comments, setComments] = useState<CommentView[]>([]);
    const [showComment, setShowComment] = useState<boolean>(false);

    useEffect(() => {
        setTitle(props.postData?.TITLE);
        setPostedBy(props.postData?.ROLE_ID === authCtx.loginData.studentRoles[0]?.ID ? 'You' : props.postData?.POSTED_BY);
        setPostedAt(new Date(props.postData?.POSTED_AT).toDateString()
            + " , " + new Date(props.postData?.POSTED_AT).toLocaleTimeString());
        setContentId(props.postData?.CONTENT_ID);
    }, [authCtx.loginData.studentRoles, props.postData]);

    const findComments = () => {
        fetch(`${server}/comments/${contentId}`, {
            mode: 'cors',
            method: 'get',
            credentials: "include",
        })
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                setComments(data);
                setShowComment(true);
            });
    }

    const commentHandler = (e: any) => {
        e.preventDefault();
        findComments();
    }

    const voteHandler = (down: string) => {
        fetch(`${server}/votes/${props.postData?.CONTENT_ID}`, {
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
            props.updatePost();
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

    return (
        <div>
            <Card className={`${styles.post}`}>
                <Card.Body>
                    <Card.Title className='p-2'><h2> {title}</h2></Card.Title>
                    <Card.Subtitle className="mb-2 mt-2 text-success text-right">
                        <b><BsFillPersonFill/>&nbsp;&nbsp;
                            {posted_by}</b>
                    </Card.Subtitle>

                    <Card.Subtitle className="mb-2 mx-2 text-dark text-right">
                        <div>
                            <b>{props.postData?.TEACHER ? <GiTeacher/> : <BsPersonLinesFill/>}&nbsp;&nbsp;
                                {`${props.postData?.TEACHER ? 'Teacher' : 'Student'}, ${props.postData?.DEPARTMENT_NAME}`}</b>
                        </div>
                    </Card.Subtitle>

                    <Card.Subtitle className="mb-2 mt-2 text-muted text-right">
                        <b><BsFillCalendar2RangeFill/>&nbsp;&nbsp;
                            {posted_at}
                        </b>
                    </Card.Subtitle>

                    <Card.Text>
                        <p className='mt-4 mb-4 text-lg-left text-left'>
                            {props.postData?.TEXT}
                        </p>
                    </Card.Text>
                </Card.Body>
            </Card>

            <div className={`${styles.footer} text-info`}>
                <div className={`text-center d-inline-flex mb-3`}>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <h6>Upvote ({props.postData?.UPVOTE_COUNT}) :&nbsp;
                        {props.postData?.DOWN === 'N' &&
                            <b><BiUpvote className={`${styles.hovering} text-black`} onClick={upVoteHandler}/></b>}
                        {props.postData?.DOWN !== 'N' &&
                            <b><BiUpvote className={`${styles.hovering}`} onClick={upVoteHandler}/></b>}
                    </h6>&nbsp;&nbsp;&nbsp;&nbsp;
                    <h6>Downvote ({props.postData?.DOWNVOTE_COUNT}) :&nbsp;
                        {props.postData?.DOWN === 'Y' &&
                            <b><BiDownvote className={`${styles.hovering} text-black`} onClick={downVoteHandler}/></b>}
                        {props.postData?.DOWN !== 'Y' &&
                            <b><BiDownvote className={`${styles.hovering}`} onClick={downVoteHandler}/></b>}
                    </h6>&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <br/>
                <b className={styles.hovering} onClick={commentHandler}><u>View Comments</u></b>

                <Form>
                    <Form.Group className="mt-4 d-flex" controlId="formBasicEmail">
                        <Form.Control as="textarea" rows={2} placeholder='Write your comment here'/>
                        &nbsp;&nbsp;
                        <Button variant='info'>comment</Button>
                    </Form.Group>
                </Form>
            </div>

            <div className={`${styles.comments} mt-3`}>
                {showComment &&
                    <div>
                        {comments.map((item, index) => (
                            <SingleComment item={item} updateComments={findComments} index={index}
                                           key={index + Math.random().toString()}/>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}

export default Post;