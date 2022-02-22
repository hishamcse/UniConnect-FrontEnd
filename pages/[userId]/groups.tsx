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
        setMode(authCtx.loggedInAs === 'management' ? 'management' :
            (authCtx.loggedInAs === 'student' ? 'student' :
                'teacher'));

        const order = parseInt(authCtx.loggedOrder);
        setUserId(authCtx.loggedInAs === 'management' ? authCtx.loginData.managementRoles[order].ID.toString() :
            (authCtx.loggedInAs === 'student' ? authCtx.loginData.studentRoles[order].ID.toString() :
                authCtx.loginData.teacherRoles[order].ID.toString()));
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