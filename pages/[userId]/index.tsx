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
    const [id, setId] = useState('');

    useEffect(() => {
        setMode(authCtx.loggedInAs === 'management' ? 'management' :
            (authCtx.loggedInAs === 'student' ? 'student' :
                'teacher'));

        const order = parseInt(authCtx.loggedOrder);
        setId(authCtx.loggedInAs === 'management' ? authCtx.loginData.managementRoles[order]?.ID.toString() :
            (authCtx.loggedInAs === 'student' ? authCtx.loginData.studentRoles[order]?.ID.toString() :
                authCtx.loginData.teacherRoles[order]?.ID.toString()))
    },[])

    return (
        <LayoutWrapper>
            {mode === 'management' && <UniInfo userId={id}/>}
            {(mode === 'student' || mode === 'teacher') && <Feed userId={id}/>}
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