import UserNavigation from "../../components/layout/UserNavigation";
import LayoutWrapper from "../../components/ui/LayoutWrapper";
import React from "react";
import UniversityInfo from "../../components/contents/university/UniversityInfo";

type User = {
    name: string;
    id: number;
    university: string
}

const UserPage: React.FC<{userId: string}> = (props) => {

    const user = {
        name: 'Mihad',
        id: props.userId,
        university: 'BUET'
    };

    return (
        <LayoutWrapper>
            <UserNavigation id={props.userId} mode='admin'/>
            <div className='text-center m-5 p-5'>
                <UniversityInfo mode='admin' userId={props.userId}/>
            </div>
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

export async function getStaticProps(context:any) {

    const userId = context.params.userId;

    return {
        props: {
            userId
        }
    }
}

export default UserPage;