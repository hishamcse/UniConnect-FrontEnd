// both for fetch and showing in UI
export type SinglePostView = {
    CONTENT_ID: number,
    TITLE: string,
    TEXT: string,
    POSTED_AT: Date,
    POSTED_BY: string,
    ROLE_ID: number,
    GROUP_ID: number,
    GROUP_NAME: string,
    COMMENT_COUNT: number,
    UPVOTE_COUNT: number,
    DOWNVOTE_COUNT: number
}