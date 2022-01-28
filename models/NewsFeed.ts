
export type NewsFeed = {
    CONTENT_ID: number,
    TITLE: string,
    GROUP_ID: number,
    SECTION_GROUP_NAME: string,
    SECTION_GROUP_ID: number,
    BATCH_DEPT_GROUP_NAME: string,
    BATCH_DEPT_GROUP_ID: number,
    BATCH_GROUP_NAME: string,
    BATCH_GROUP_ID: number,
    DEPARTMENT_PG_STUDENTS_GROUP_NAME: string,
    DEPARTMENT_PG_STUDENTS_GROUP_ID: number,
    DEPARTMENT_ALL_STUDENTS_GROUP_NAME: string,
    DEPARTMENT_ALL_STUDENTS_GROUP_ID: number,
    DEPARTMENT_STUDENTS_TEACHERS_GROUP_NAME: string,
    DEPARTMENT_STUDENTS_TEACHERS_GROUP_ID: number,
    UNIVERSITY_PG_STUDENTS_GROUP_NAME: string,
    UNIVERSITY_PG_STUDENTS_GROUP_ID: number,
    UNIVERSITY_ALL_STUDENTS_GROUP_NAME: string,
    UNIVERSITY_ALL_STUDENTS_GROUP_ID: number,
    UNIVERSITY_STUDENTS_TEACHERS_GROUP_NAME: string,
    UNIVERSITY_STUDENTS_TEACHERS_GROUP_ID: number,
    CONTENT_ID_1: number,
    TEXT: string,
    POSTED_AT: string,
    ROLE_ID: number
}

export type FeedInfoView = {
    title: string,
    content: string,
    posted_by: number,
    group: string,
    posted_at: string
}