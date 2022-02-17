import React, {useContext, useEffect, useState} from "react";
import styles from "./Posts.module.scss";
import {FeedInfoView} from "../../../models/NewsFeed";
import {Button, Card} from "react-bootstrap";
import {useRouter} from "next/router";
import AuthContext from "../../../store/auth-context";
import {BiDownvote, BiUpvote} from "react-icons/bi";
import {RiGroupFill} from "react-icons/ri";
import {GiTeacher} from "react-icons/gi";
import {BsFillCalendar2RangeFill, BsFillPersonFill, BsPersonLinesFill, BsSignpost2} from "react-icons/bs";

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
                <Card.Title className = 'mx-5 my-2 py-2'><h3>{item.title}</h3></Card.Title>
                <hr className = 'hr-mid'/>
                <Card.Subtitle className="mt-3 mb-2 mx-2 text-success text-right">
                    <div>
                        <b><BsFillPersonFill/>&nbsp;&nbsp;
                            {item.posted_by}
                        </b>
                    </div>
                </Card.Subtitle>

                <Card.Subtitle className="mb-2 mx-2 text-dark text-right">
                    <div>
                        <b>
                            {item.teacher ? <GiTeacher /> : <BsPersonLinesFill />}&nbsp;
                            {`${item.teacher ? 'Teacher' : 'Student' }, ${item.department_name}`}
                        </b>
                    </div>
                </Card.Subtitle>

                <Card.Subtitle className="m-2 text-muted text-right">
                    <div>
                        <b><BsFillCalendar2RangeFill/>&nbsp;&nbsp;
                            {new Date(item.posted_at).toLocaleTimeString()
                                + " , " + new Date(item.posted_at).toDateString()}
                        </b>
                    </div>
                </Card.Subtitle>

                <Card.Subtitle className="m-2 text-muted text-right">
                    <RiGroupFill/> {item.group}
                </Card.Subtitle>

                <Card.Text className='m-4 text-left px-5'>
                    <p className='lead'>
                        {item.content}
                        <p className='text-muted'>(Click <b className='text-info'>details</b> to see full post)</p>
                    </p>
                </Card.Text>

                <div className={`${styles.footer} text-info`}>
                    <div className='text-center d-inline-flex mb-3'>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <h6>Upvote ({item.upvote}) :&nbsp;
                            {item.down === 'N' && <b><BiUpvote className='text-black'/></b>}
                            {item.down !== 'N' && <b><BiUpvote/></b>}
                        </h6>&nbsp;&nbsp;&nbsp;&nbsp;
                        <h6>Downvote ({item.downvote}) :&nbsp;
                            {item.down === 'Y' && <b><BiDownvote className='text-black'/></b>}
                            {item.down !== 'Y' && <b><BiDownvote/></b>}
                        </h6>&nbsp;&nbsp;&nbsp;&nbsp;
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