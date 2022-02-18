import React, {Fragment, useEffect, useState} from "react";
import styles from '../posts/Posts.module.scss'
import {FeedInfoView} from "../../../models/NewsFeed";
import {parseNewsFeedData} from "../../../parseUtils/ParseNewsFeedData";
import PostCard from "../posts/PostCard";
import {Button} from "react-bootstrap";
import {useRouter} from "next/router";

const server = 'http://localhost:3000';

const FullGroupView: React.FC<{ mode: string, groupId: string, groupName: string | string[] | undefined }> = (props) => {

    const [feedData, setFeedData] = useState<FeedInfoView[]>([]);

    const router = useRouter();

    useEffect(() => {
        fetch(`${server}/posts/${props.groupId}/1/after/20/desc`, {
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

    const addPostHandler = async (e:any) => {
        e.preventDefault();

        await router.push({
            pathname: `/groups/${props.groupId}/addPost`,
            query: {grp: props?.groupName || feedData[0]?.group}
        });
    }

    const background = props.mode === 'admin' ? 'bg-secondary' :
        (props.mode === 'student' ? styles['background-student'] : '');

    return (
        <Fragment>
            <div className='m-4 p-4 text-lg-left'>
                <div className={`${styles.university} ${background} p-3`}>
                    <h2>Recent Posts From {props?.groupName || feedData[0]?.group}</h2>
                </div>

                <div className='mt-5'>
                    <Button variant='success' size='lg' onClick={addPostHandler}>
                        Create Post In This Group
                    </Button>
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

export default FullGroupView;

// <CTable align="middle" className="mb-3 border" hover responsive>
//                     <CTableHead color="light">
//                         <CTableRow>
//                             <CTableHeaderCell className="text-center">
//                                 <MdOutlineSubtitles/> Post Title
//                             </CTableHeaderCell>
//                             <CTableHeaderCell>
//                                 <BiBookContent/> Content Preview</CTableHeaderCell>
//                             <CTableHeaderCell className="text-center">
//                                 <BsFillPersonFill/> Posted By
//                             </CTableHeaderCell>
//                             <CTableHeaderCell className="text-center">
//                                 <RiGroupFill/> Group
//                             </CTableHeaderCell>
//                             <CTableHeaderCell>
//                                 <BsFillCalendar2RangeFill/> Posted At
//                             </CTableHeaderCell>
//                         </CTableRow>
//                     </CTableHead>
//
//                     <CTableBody>
//                         {feedData.map((item, index) => (
//                             <CTableRow v-for="item in tableItems" key={index + Math.random().toString()}>
//                                 <CTableDataCell>
//                                     <div><b>{item.title}</b></div>
//                                     <div className="small text-medium-emphasis">
//                                     </div>
//                                 </CTableDataCell>
//                                 <CTableDataCell>
//                                     <div>
//                                         <p>
//                                             {item.content}
//                                         </p>
//                                     </div>
//                                 </CTableDataCell>
//                                 <CTableDataCell>
//                                     <div>{item.posted_by}</div>
//                                 </CTableDataCell>
//                                 <CTableDataCell className="text-center">
//                                     {item.group}
//                                 </CTableDataCell>
//                                 <CTableDataCell>
//                                     <b>{item.posted_at}</b>
//                                 </CTableDataCell>
//                             </CTableRow>
//                         ))}
//                     </CTableBody>
//                 </CTable>