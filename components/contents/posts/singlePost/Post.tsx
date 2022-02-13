import React, {useContext, useEffect, useState} from "react";
import {SinglePostView} from "../../../../models/SinglePost";
import styles from './FullView.module.scss';
import {Button, Card, Form} from "react-bootstrap";
import AuthContext from "../../../../store/auth-context";
import {BiDownvote, BiUpvote} from "react-icons/bi";
import {CommentView} from "../../../../models/Comment";
import SingleComment from "../comments/SingleComment";

const server = 'http://localhost:3000';

const Post: React.FC<{ postData: SinglePostView }> = (props) => {

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

    const commentHandler = (e: any) => {
        e.preventDefault();

        fetch(`${server}/groups/comments/${contentId}`, {
            mode: 'cors',
            method: 'get',
            credentials: "include",
        })
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                console.log(data);
                setComments(data);
                setShowComment(true);
            });
    }

    return (
        <div>
            <Card className={`${styles.post}`}>
                <Card.Body>
                    <Card.Title><h3>{title}</h3></Card.Title>
                    <Card.Subtitle className="mb-2 mt-2 text-success">
                        <h5>Posted By : {posted_by}</h5>
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 mt-2 text-muted">
                        <h6>Posted At : {posted_at}</h6>
                    </Card.Subtitle>
                    <Card.Text>
                        <p className='mt-4 mb-4 text-lg-left'>
                            {props.postData?.TEXT}
                        </p>
                    </Card.Text>
                </Card.Body>
            </Card>

            <div className={`${styles.footer} text-info`}>
                <div className={`text-center d-inline-flex mb-3`}>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <h6>Upvote (0) :&nbsp;<b><BiUpvote className={styles.hovering}/></b></h6>&nbsp;&nbsp;&nbsp;&nbsp;
                    <h6>Downvote (0) :&nbsp;<BiDownvote className={styles.hovering}/></h6>&nbsp;&nbsp;&nbsp;&nbsp;
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
                            <SingleComment item={item} index={index} key={index + Math.random().toString()}/>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}

export default Post;