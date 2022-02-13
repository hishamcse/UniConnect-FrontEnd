import React, {useContext, useEffect, useState} from "react";
import styles from "./NewsFeed.module.scss";
import {FeedInfoView} from "../../../models/NewsFeed";
import {Button, Card} from "react-bootstrap";
import {useRouter} from "next/router";
import AuthContext from "../../../store/auth-context";
import {BiDownvote, BiUpvote} from "react-icons/bi";
import {RiGroupFill} from "react-icons/ri";
import {BsFillCalendar2RangeFill, BsFillPersonFill, BsSignpost2} from "react-icons/bs";

const PostCard: React.FC<{ mode: string, item: FeedInfoView, index: number }> = (props) => {

    const authCtx = useContext(AuthContext);
    const router = useRouter();

    const [userId, setUserId] = useState<string>();

    useEffect(() => {
        setUserId(authCtx.loggedInAs === 'student' ? authCtx.loginData.studentRoles[0].ID.toString() :
            authCtx.loginData.teacherRoles[0].ID.toString());
    }, []);

    const item = props.item;
    const index = props.index;

    const postDetailsHandler = async (e: any) => {
        e.preventDefault();

        await router.push(`/posts/${props.item.content_id}`);
    }

    return (
        <Card key={index + Math.random().toString()} className={styles.card}>
            <Card.Body>
                <Card.Title><h3>{item.title}</h3></Card.Title>
                <Card.Subtitle className="mt-3 mb-2 text-success">
                    <div>
                        <b><BsFillPersonFill/>&nbsp;&nbsp;
                            {item.posted_by}
                        </b>
                    </div>
                </Card.Subtitle>

                <Card.Subtitle className="m-2 text-muted">
                    <div>
                        <b><BsFillCalendar2RangeFill/>&nbsp;&nbsp;
                            {new Date(item.posted_at).toLocaleTimeString()
                                + " , " + new Date(item.posted_at).toDateString()}
                        </b>
                    </div>
                </Card.Subtitle>

                <Card.Subtitle className="m-2 text-muted">
                    <RiGroupFill/> {item.group}
                </Card.Subtitle>

                <Card.Text className='m-4'>
                    <p className='lead'>
                        {item.content}
                        <p className='text-muted'>(Click <b className='text-info'>details</b> to see full post)</p>
                    </p>
                </Card.Text>

                <div className={`${styles.footer} text-info`}>
                    <div className='text-center d-inline-flex mb-3'>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <h6>Upvote ({item.upvote}) :&nbsp;<b><BiUpvote/></b></h6>&nbsp;&nbsp;&nbsp;&nbsp;
                        <h6>Downvote ({item.downvote}) :&nbsp;<BiDownvote/></h6>&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <br/>
                    <b>{item.comment_count} Comments</b>
                </div>

                <Card.Footer className='mt-4' style={{width: '100%'}}>
                    <Button type='button' className='m-2 btn-success' value={item.content_id}
                            onClick={postDetailsHandler}>
                        <BsSignpost2/> Details
                    </Button>
                </Card.Footer>
            </Card.Body>
        </Card>
    )
}

export default PostCard;