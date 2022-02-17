import React from "react";
import LayoutWrapper from "../../../components/ui/LayoutWrapper";
import {useRouter} from "next/router";
import CreatePost from "../../../components/contents/posts/CreatePost";

const AddPost:React.FC = () => {

    const router = useRouter();

    return (
        <LayoutWrapper>
            <CreatePost grpId={router.asPath.split('/')[2]} grp_name={router.query?.grp}/>
        </LayoutWrapper>
    )
}

export default AddPost;