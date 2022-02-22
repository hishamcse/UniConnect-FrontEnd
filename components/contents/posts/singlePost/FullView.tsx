import React, {Fragment, useContext, useEffect, useState} from "react";
import {SinglePostView} from "../../../../models/SinglePost";
import AuthContext from "../../../../store/auth-context";
import styles from "./FullView.module.scss";
import Post from "./Post";

const server = 'http://localhost:3000';

const FullView: React.FC<{ mode: string, contentId: string }> = (props) => {

    const [singlePostData, setSinglePostData] = useState<SinglePostView[]>([]);
    const [versityName, setVersityName] = useState<string>();

    const authCtx = useContext(AuthContext);

    const findSinglePostData = () => {
        fetch(`${server}/posts/${props.contentId}`, {
            mode: 'cors',
            method: 'get',
            credentials: "include",
        })
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                setSinglePostData(data);
            });
    }

    useEffect(() => {

        let uniName: string;
        const order = parseInt(authCtx.loggedOrder);

        if (authCtx.loggedInAs === 'student') {
            uniName = authCtx.loginData.studentRoles[order].UNIVERSITY_NAME;
        } else {
            uniName = authCtx.loginData.teacherRoles[order].UNIVERSITY_NAME;
        }

        setVersityName(uniName);
        findSinglePostData();
    }, []);

    const background = props.mode === 'management' ? 'bg-secondary' :
        (props.mode === 'student' ? styles['background-student'] : '');

    return (
        <Fragment>
            <div className={`${styles.university} m-5 p-4 ${background}`}>
                <h3>{versityName}</h3>
                <h3 className='text-light'>Post from : {singlePostData[0]?.GROUP_NAME}</h3>
            </div>
            <div>
                <Post postData={singlePostData[0]} updatePost={findSinglePostData}/>
            </div>
        </Fragment>
    );
}

export default FullView;