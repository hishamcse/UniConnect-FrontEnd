import React, {useEffect, useState} from "react";
import styles from "./NewsFeed.module.scss";
import {CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow} from "@coreui/react";
import {BsFillCalendar2RangeFill, BsFillPersonFill} from "react-icons/bs";
import {BiBookContent} from "react-icons/bi";
import {MdOutlineSubtitles} from "react-icons/md";
import {RiGroupFill} from "react-icons/ri";
import {FeedInfoView} from "../../../models/NewsFeed";
import {parseNewsFeedData} from "../../../parseUtils/ParseNewsFeedData";

const server = 'http://localhost:3000';

const NewsFeed: React.FC<{ mode: string, userId: string }> = (props) => {

    const [feedData, setFeedData] = useState<FeedInfoView[]>([]);

    useEffect(() => {

        fetch(`${server}/groups`, {
            mode: 'cors',
            method: 'get',
            credentials: "include",
        })
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                console.log(data);
                let arr = parseNewsFeedData(data);
                setFeedData(arr);
            });
    }, []);

    const background = props.mode === 'admin' ? 'bg-secondary' :
        (props.mode === 'student' ? styles['background-student'] : '');


    return (
        <div className={`${styles.university} m-5 p-4 ${background}`}>
            <h2>Recent Posts</h2>
            <div className='p-2 mt-5'>
                <CTable align="middle" className="mb-3 border" hover responsive>
                    <CTableHead color="light">
                        <CTableRow>
                            <CTableHeaderCell className="text-center">
                                <MdOutlineSubtitles/> Post Title
                            </CTableHeaderCell>
                            <CTableHeaderCell>
                                <BiBookContent/> Content Preview</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                                <BsFillPersonFill/> Posted By
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                                <RiGroupFill/> Group
                            </CTableHeaderCell>
                            <CTableHeaderCell>
                                <BsFillCalendar2RangeFill/> Posted At
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>

                    <CTableBody>
                        {feedData.map((item, index) => (
                            <CTableRow v-for="item in tableItems" key={index + Math.random().toString()}>
                                <CTableDataCell>
                                    <div><b>{item.title}</b></div>
                                    <div className="small text-medium-emphasis">
                                    </div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>
                                        <p>
                                            {item.content}
                                        </p>
                                    </div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{item.posted_by}</div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    {item.group}
                                </CTableDataCell>
                                <CTableDataCell>
                                    <b>{item.posted_at}</b>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </div>
        </div>
    );
}

export default NewsFeed;