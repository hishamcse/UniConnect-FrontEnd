// both for comment and replies fetching
export type CommentView = {
    CONTENT_ID: number,
    ROLE_ID: number,
    USERNAME: number,
    TEXT: string,
    GROUP_ID: number,
    POSTED_AT: Date,
    GROUP_NAME: string,
    REPLIES: number,
    UPVOTE: number,
    DOWNVOTE: number,
    DOWN: string
}