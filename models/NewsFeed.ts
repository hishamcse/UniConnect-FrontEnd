export type NewsFeed = {
    CONTENT_ID: number,
    TITLE: string,
    TEXT: string,
    POSTED_AT: string,
    POSTED_BY: string,
    GROUP_ID: number,
    GROUP_NAME: string,
    COMMENT_COUNT: number,
    UPVOTE_COUNT: number,
    DOWNVOTE_COUNT: number,
    DOWN: string,
    TEACHER : number,
    STUDENT : number,
    DEPARTMENT_NAME : string
}

export type FeedInfoView = {
    title: string,
    content: string,
    posted_by: string,
    content_id: number,
    group_id: number,
    group: string,
    posted_at: string,
    comment_count: number,
    upvote: number,
    downvote: number,
    teacher : number,
    student : number,
    department_name : string,
    down: string
}