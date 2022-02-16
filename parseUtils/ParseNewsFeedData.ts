import {FeedInfoView, NewsFeed} from "../models/NewsFeed";

export const parseNewsFeedData = (arr: NewsFeed[]): FeedInfoView[] => {
    let allFeedData: FeedInfoView[] = [];

    arr.forEach(data => {
        const text = `${data.TEXT?.split(' ').slice(0, 100).join(' ')}...`;

        allFeedData.push({
            title: data.TITLE,
            content: text,
            posted_by: data.POSTED_BY,
            role_id: data.ROLE_ID,
            content_id: data.CONTENT_ID,
            group_id: data.GROUP_ID,
            group: data.GROUP_NAME,
            posted_at: new Date(data.POSTED_AT).toLocaleString(),
            comment_count: data.COMMENT_COUNT,
            upvote: data.UPVOTE_COUNT,
            downvote: data.DOWNVOTE_COUNT,
            teacher : data.TEACHER,
            student : data.STUDENT,
            department_name : data.DEPARTMENT_NAME,
            down: data.DOWN
        });
    });

    return allFeedData;
}