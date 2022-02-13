import React, {useContext, useEffect, useState} from "react";
import LayoutWrapper from "../../components/ui/LayoutWrapper";
import FullView from "../../components/contents/posts/singlePost/FullView";
import AuthContext from "../../store/auth-context";
import UserNavigation from "../../components/layout/UserNavigation";

type Content = {
    id: number;
}

const SinglePost: React.FC<{ contentId: string }> = (props) => {

    const authCtx = useContext(AuthContext);

    const [mode,setMode] = useState('');
    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        setMode(authCtx.loggedInAs === 'management' ? 'admin' :
            (authCtx.loggedInAs === 'student' ? 'student' :
                'teacher'));
        setUserId(authCtx.loggedInAs === 'management' ? authCtx.loginData.managementRoles[0].ID.toString() :
            (authCtx.loggedInAs === 'student' ? authCtx.loginData.studentRoles[0].ID.toString() :
                authCtx.loginData.teacherRoles[0].ID.toString()))
    },[]);

    return (
        <LayoutWrapper>
            <UserNavigation id={userId}/>
            <div className='text-center m-5 p-5'>
                <FullView mode={mode} contentId={props.contentId}/>
            </div>
        </LayoutWrapper>
    );
}

export async function getStaticPaths() {

    let posts: Content[];
    posts = [{
        id: 4,
    }, {
        id: 8,
    }];

    const paramArr = posts.map(post => ({
        params: {
            contentId: post.id.toString()
        }
    }))

    return {
        fallback: 'blocking',
        paths: paramArr
    }
}

export async function getStaticProps(context: any) {

    const contentId = context.params.contentId;

    return {
        props: {
            contentId
        }
    }
}

export default SinglePost;