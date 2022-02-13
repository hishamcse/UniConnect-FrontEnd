import UserNavigation from "../../components/layout/UserNavigation";
import LayoutWrapper from "../../components/ui/LayoutWrapper";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import AllGroups from "../../components/contents/groups/AllGroups";

const Groups: React.FC = () => {

    const authCtx = useContext(AuthContext);

    const [mode, setMode] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        setMode(authCtx.loggedInAs === 'management' ? 'admin' :
            (authCtx.loggedInAs === 'student' ? 'student' :
                'teacher'));

        setUserId(authCtx.loggedInAs === 'management' ? authCtx.loginData.managementRoles[0].ID.toString() :
            (authCtx.loggedInAs === 'student' ? authCtx.loginData.studentRoles[0].ID.toString() :
                authCtx.loginData.teacherRoles[0].ID.toString()));
    }, []);

    return (
        <LayoutWrapper>
            <UserNavigation id={userId}/>
            <div className='text-center m-5 p-5'>
                <AllGroups mode={mode} userId={userId}/>
            </div>
        </LayoutWrapper>
    );
}

export default Groups;