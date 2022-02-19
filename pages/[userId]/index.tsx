import LayoutWrapper from "../../components/ui/LayoutWrapper";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import UniInfo from "./uniInfo";
import Feed from "./feed";

type User = {
    name: string;
    id: number;
    university: string
}

const UserPage: React.FC<{ userId: string }> = (props) => {

    const authCtx = useContext(AuthContext);

    const [mode, setMode] = useState('');
    const [userId, setUserId] = useState(props.userId);

    useEffect(() => {
        setMode(authCtx.loggedInAs === 'management' ? 'admin' :
            (authCtx.loggedInAs === 'student' ? 'student' :
                'teacher'));
        setUserId(authCtx.loggedInAs === 'management' ? authCtx.loginData.managementRoles[0].ID.toString() :
            (authCtx.loggedInAs === 'student' ? authCtx.loginData.studentRoles[0].ID.toString() :
                authCtx.loginData.teacherRoles[0].ID.toString()))
    },[])

    return (
        <LayoutWrapper>
            {mode === 'admin' && <UniInfo userId={userId}/>}
            {(mode === 'student' || mode === 'teacher') && <Feed userId={userId}/>}
        </LayoutWrapper>
    );
}

export async function getStaticPaths() {

    let users: User[];
    users = [{
        name: 'Hisham',
        id: 4,
        university: 'BUET'
    }, {
        name: 'Mihad',
        id: 8,
        university: 'BUET'
    }];

    const paramArr = users.map(user => ({
        params: {
            userId: user.id.toString()
        }
    }))

    return {
        fallback: 'blocking',
        paths: paramArr
    }
}

export async function getStaticProps(context: any) {

    const userId = context.params.userId;

    return {
        props: {
            userId
        }
    }
}

export default UserPage;