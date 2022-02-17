import React, {useEffect, useRef, useState} from "react";
import {Button, Card, Form, Image, Spinner} from "react-bootstrap";
import {CommentView} from "../../../../models/Comment";
import styles from "../Posts.module.scss";
import {BiDownvote, BiUpvote} from "react-icons/bi";
import SingleReply from "./SingleReply";

const server = 'http://localhost:3000';

const SingleComment: React.FC<{ item: CommentView, updateComments: () => void, index: number }> = (props) => {

    const [replies, setReplies] = useState<CommentView[]>([]);
    const [showReplies, setShowReplies] = useState(false);
    const [replyLoading, setReplyLoading] = useState<boolean>(false);

    const newReply = useRef<HTMLTextAreaElement | null>(null);

    const item = props.item;
    const index = props.index;

    useEffect(() => {
        findReplies();
    }, [])

    const voteHandler = (down: string) => {
        fetch(`${server}/votes/${props.item.CONTENT_ID}`, {
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
            props.updateComments();
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

    const findReplies = () => {
        fetch(`${server}/comments/${item.CONTENT_ID}`, {
            mode: 'cors',
            method: 'get',
            credentials: "include",
        })
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                setReplies(data);
                setShowReplies(true);
            });
    }

    const repliesHandler = (e: any) => {
        e.preventDefault();
        findReplies();
    }

    const postReplyHandler = (e: any) => {
        e.preventDefault();

        const replyStr = newReply.current?.value;
        if (replyStr?.trim().length === 0) return;
        setReplyLoading(true);

        fetch(`${server}/comments/${item.CONTENT_ID}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                text: replyStr,
            })
        }).then(resp => {
            return resp.json();
        }).then(_ => {
            props.updateComments();
        }).finally(() => {
            setReplyLoading(false);
            // @ts-ignore
            newReply.current.value = '';
        });
    }

    return (
        <Card key={index + Math.random().toString()} bg='light' className='p-2 mb-5 text-black'>
            <Card.Body>
                <div className='d-flex'>
                    <Card.Subtitle className="mt-3 mb-2 text-success d-flex">
                        <Image src='/id-icon.png' width={25} height={25} alt='id'/>&nbsp;&nbsp;
                        {item.USERNAME}
                    </Card.Subtitle>
                </div>

                <Card.Subtitle className="mb-2 text-muted">
                    <div className='d-flex'>
                        <b>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {new Date(item.POSTED_AT).toLocaleTimeString()
                                + " , " + new Date(item.POSTED_AT).toDateString()}
                        </b>
                    </div>
                </Card.Subtitle>

                <Card.Text className='mt-4 mb-4 d-flex`'>
                    <p className='text-left px-4'>
                        {item.TEXT}
                    </p>
                </Card.Text>

                <div className={`text-info`}>
                    <div className='d-flex'>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <h6>Upvote ({item.UPVOTE}) :&nbsp;
                            {item.DOWN === 'N' &&
                                <b><BiUpvote className={`${styles.hovering} text-black`} onClick={upVoteHandler}/></b>}
                            {item.DOWN !== 'N' &&
                                <b><BiUpvote className={`${styles.hovering}`} onClick={upVoteHandler}/></b>}
                        </h6>&nbsp;&nbsp;&nbsp;&nbsp;
                        <h6>Downvote ({item.DOWNVOTE}) :&nbsp;
                            {item.DOWN === 'Y' &&
                                <b><BiDownvote className={`${styles.hovering} text-black`}
                                               onClick={downVoteHandler}/></b>}
                            {item.DOWN !== 'Y' &&
                                <b><BiDownvote className={`${styles.hovering}`} onClick={downVoteHandler}/></b>}
                        </h6>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <h6 className={styles.hovering} onClick={repliesHandler}><u>{item.REPLIES} replies</u></h6>
                    </div>
                    <br/>
                </div>

                <Card.Text className='mt-2' style={{width: '100%'}}>
                    <Form>
                        <Form.Group className="mt-2 d-flex" controlId="formBasicEmail">
                            <Form.Control as="textarea" rows={2} placeholder='reply to this comment' ref={newReply}/>
                            &nbsp;&nbsp;
                            <Button variant='outline-success' onClick={postReplyHandler}>comment</Button>
                            {replyLoading && <Spinner animation="border" variant="info"/>}
                        </Form.Group>
                    </Form>
                </Card.Text>

                <div className='m-4'>
                    {showReplies && replies.map((reply, index) =>
                        <SingleReply key={index + Math.random().toString()} replyData={reply}
                                     updateReplies={findReplies}/>)}
                </div>
            </Card.Body>
        </Card>
    );
}

export default SingleComment;