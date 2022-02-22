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
        setMode(authCtx.loggedInAs === 'management' ? 'management' :
            (authCtx.loggedInAs === 'student' ? 'student' :
                'teacher'));

        const order = parseInt(authCtx.loggedOrder);
        setUserId(authCtx.loggedInAs === 'management' ? authCtx.loginData.managementRoles[order].ID.toString() :
            (authCtx.loggedInAs === 'student' ? authCtx.loginData.studentRoles[order].ID.toString() :
                authCtx.loginData.teacherRoles[order].ID.toString()))
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