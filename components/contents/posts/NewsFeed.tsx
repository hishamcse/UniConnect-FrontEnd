import React, {Fragment, useEffect, useState} from "react";
import styles from "./NewsFeed.module.scss";
import {FeedInfoView} from "../../../models/NewsFeed";
import {parseNewsFeedData} from "../../../parseUtils/ParseNewsFeedData";
import PostCard from "./PostCard";

const server = 'http://localhost:3000';

const NewsFeed: React.FC<{ mode: string, userId: string }> = (props) => {

    const [feedData, setFeedData] = useState<FeedInfoView[]>([]);

    useEffect(() => {
        fetch(`${server}/posts/all`, {
            mode: 'cors',
            method: 'get',
            credentials: "include",
        })
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                let arr = parseNewsFeedData(data);
                setFeedData(arr);
            });
    }, []);

    const background = props.mode === 'admin' ? 'bg-secondary' :
        (props.mode === 'student' ? styles['background-student'] : '');

    return (
        <Fragment>
            <div className='m-4 p-4 text-lg-left'>
                <div className={`${styles.university} ${background} p-3`}>
                    <h2>Recent Posts From All Groups</h2>
                </div>

                <div className='m-5 text-lg-left'>
                    {feedData.map((item, index) => (
                        <PostCard mode={props.mode} item={item} index={index} key={index + Math.random().toString()}/>
                    ))}
                </div>
            </div>
        </Fragment>
    );
}

export default NewsFeed;