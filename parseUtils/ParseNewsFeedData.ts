import {FeedInfoView, NewsFeed} from "../models/NewsFeed";

export const parseNewsFeedData = (arr: NewsFeed[]): FeedInfoView[] => {
    let allFeedData: FeedInfoView[] = [];

    const find_grp_name = (data: NewsFeed, grp_id: number) => {
        // @ts-ignore
        const key = Object.keys(data).find(key => key !== 'GROUP_ID' && key !== 'CONTENT_ID' && data[key] === grp_id);
        // @ts-ignore
        const strs = key.split('_');
        return strs.slice(0, strs.length - 1).join('_').concat('_NAME');
    }

    arr.forEach(data => {
        const text = `${data.TEXT?.split(' ').slice(0, 10).join(' ')}...`;
        const grp_name = find_grp_name(data, data.GROUP_ID)

        allFeedData.push({
            title: data.TITLE,
            content: text,
            posted_by: data.ROLE_ID,
            // @ts-ignore
            group: data[grp_name],
            posted_at: new Date(data.POSTED_AT).toLocaleString()
        });
    });

    return allFeedData;
}