import UserNavigation from "../../components/layout/UserNavigation";
import LayoutWrapper from "../../components/ui/LayoutWrapper";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import UniversityInfo from "../../components/contents/university/UniversityInfo";
import {useRouter} from "next/router";

const UniInfo: React.FC<{ userId: string }> = (props) => {

    const authCtx = useContext(AuthContext);
    const router = useRouter();

    const [mode,setMode] = useState('');

    useEffect(() => {
        setMode(authCtx.loggedInAs === 'management' ? 'admin' :
            (authCtx.loggedInAs === 'student' ? 'student' :
                'teacher'));
    },[]);

    return (
        <LayoutWrapper>
            <UserNavigation id={props.userId}/>
            <div className='text-center m-5 p-5'>
                <UniversityInfo mode={mode} userId={props.userId || router.asPath.split('/')[1]}/>
            </div>
        </LayoutWrapper>
    );
}

export default UniInfo;