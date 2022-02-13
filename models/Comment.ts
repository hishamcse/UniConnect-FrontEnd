// both for fetching and ui
export type CommentView = {
    CONTENT_ID: number,
    COMMENT_OF: number,
    POSTED_AT: Date,
    USERNAME: string,
    REPLIES: number,
    UPVOTE: number,
    DOWNVOTE: number
}