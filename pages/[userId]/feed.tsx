import UserNavigation from "../../components/layout/UserNavigation";
import LayoutWrapper from "../../components/ui/LayoutWrapper";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import NewsFeed from "../../components/contents/posts/NewsFeed";

const Feed: React.FC<{ userId: string }> = (props) => {

    const authCtx = useContext(AuthContext);

    const [mode, setMode] = useState('');

    useEffect(() => {
        setMode(authCtx.loggedInAs === 'management' ? 'management' :
            (authCtx.loggedInAs === 'student' ? 'student' :
                'teacher'));
    }, []);

    return (
        <LayoutWrapper>
            <UserNavigation id={props.userId}/>
            <div className='text-center m-5 p-5'>
                <NewsFeed mode={mode} userId={props.userId}/>
            </div>
        </LayoutWrapper>
    );
}

export default Feed;