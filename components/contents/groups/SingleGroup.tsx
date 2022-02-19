import React from "react";
import {Card, CardActionArea, CardMedia, CardContent, Typography, CardActions} from "@mui/material";
import styles from './AllGroups.module.scss';
import {Button} from "react-bootstrap";
import {GroupSummaryView} from "../../../models/GroupData";
import {useRouter} from "next/router";

const SingleGroup: React.FC<{ type: string, groupData: GroupSummaryView }> = (props) => {

    const router = useRouter();
    const cardStyle = props.type === 'default' ? styles.defaultCard : styles.customCard;

    if (props.type === 'custom') console.log(props.groupData)

    const visitGroupHandler = async (e: any) => {
        e.preventDefault();

        await router.push({
            pathname: `/groups/${props.groupData.GROUP_ID}`,
            query: {grp: props.groupData.NAME}
        });
    }

    const addPostHandler = async (e: any) => {
        e.preventDefault();

        await router.push({
            pathname: `/groups/${props.groupData.GROUP_ID}/addPost`,
            query: {grp: props.groupData.NAME}
        });
    }

    const addMemberHandler = async (e: any) => {
        e.preventDefault();

        await router.push({
            pathname: `/groups/${props.groupData.GROUP_ID}/addMember`,
            query: {grp: props.groupData.NAME}
        });
    }

    return (
        <div className='m-2'>
            <Card className={`${cardStyle} text-light`}>
                <CardActionArea>
                    <CardMedia component="img" height="220" image="/grp-background-1.jpg" alt="group"/>
                    <CardContent style={{height: '12.5vw'}}>
                        <Typography gutterBottom variant="h6" component="div" className='text-info'>
                            <b>{props.groupData.NAME}</b>
                        </Typography>

                        <Typography variant="body2" color="text.light" className='p-2'>
                            <h5>Member Count: <b>{props.groupData.GROUP_MEMBERS_COUNT}</b></h5>
                            <h5>Total Posts: <b>{props.groupData.GROUP_POSTS_COUNT}</b></h5>
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <div className='bg-gradient'>
                    <CardActions className={`${styles.button}`}>
                        <Button variant='dark' onClick={visitGroupHandler} className='me-lg-auto'>
                            Visit Group
                        </Button>
                        <Button variant='dark' onClick={addPostHandler}>
                            Post Here
                        </Button>
                        {props.groupData.MEMBER_ROLE === 'adm' &&
                            <Button variant='dark' onClick={addMemberHandler}>
                                Add Member
                            </Button>}
                    </CardActions>
                </div>
            </Card>
        </div>
    );
}

export default SingleGroup;