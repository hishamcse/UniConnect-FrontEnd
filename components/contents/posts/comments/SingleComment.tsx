import React from "react";
import {Button, Card, Form, Image} from "react-bootstrap";
import {CommentView} from "../../../../models/Comment";
import styles from "../NewsFeed.module.scss";
import {BiDownvote, BiUpvote} from "react-icons/bi";

const SingleComment: React.FC<{ item: CommentView, index: number }> = (props) => {

    const item = props.item;
    const index = props.index;

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

                <Card.Text className='mt-4 mb-4 d-flex'>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam perspiciatis quidem
                        quis. A commodi culpa eligendi laborum pariatur saepe sint velit voluptatum. Ad distinctio
                        dolores iure modi soluta, voluptas.
                    </p>
                </Card.Text>

                <div className={`text-info`}>
                    <div className='d-flex'>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <h6>Upvote ({item.UPVOTE}) :&nbsp;<b><BiUpvote className={styles.hovering}/></b>
                        </h6>&nbsp;&nbsp;&nbsp;&nbsp;
                        <h6>Downvote ({item.DOWNVOTE}) :&nbsp;<BiDownvote className={styles.hovering}/></h6>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <h6 className={styles.hovering}><u>{item.REPLIES} replies</u></h6>
                    </div>
                    <br/>
                </div>

                <Card.Text className='mt-2' style={{width: '100%'}}>
                    <Form>
                        <Form.Group className="mt-2 d-flex" controlId="formBasicEmail">
                            <Form.Control as="textarea" rows={2} placeholder='reply to this comment'/>
                            &nbsp;&nbsp;
                            <Button variant='outline-success'>comment</Button>
                        </Form.Group>
                    </Form>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default SingleComment;