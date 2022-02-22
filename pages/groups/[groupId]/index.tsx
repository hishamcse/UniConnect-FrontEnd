import React, {useContext, useEffect, useState} from "react";
import LayoutWrapper from "../../../components/ui/LayoutWrapper";
import AuthContext from "../../../store/auth-context";
import UserNavigation from "../../../components/layout/UserNavigation";
import FullGroupView from "../../../components/contents/groups/FullGroupView";
import {useRouter} from "next/router";

type Group = {
    id: number;
}

const SingleGroup: React.FC<{ groupId: string }> = (props) => {

    const authCtx = useContext(AuthContext);
    const router = useRouter();

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
                <FullGroupView mode={mode} groupId={props.groupId} groupName={router.query.grp}/>
            </div>
        </LayoutWrapper>
    );
}

export async function getStaticPaths() {

    let groups: Group[];
    groups = [{
        id: 4,
    }, {
        id: 8,
    }];

    const paramArr = groups.map(grp => ({
        params: {
            groupId: grp.id.toString()
        }
    }))

    return {
        fallback: 'blocking',
        paths: paramArr
    }
}

export async function getStaticProps(context: any) {

    const groupId = context.params.groupId;

    return {
        props: {
            groupId
        }
    }
}

export default SingleGroup;