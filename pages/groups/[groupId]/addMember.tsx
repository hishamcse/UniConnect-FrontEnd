import {useRouter} from "next/router";
import LayoutWrapper from "../../../components/ui/LayoutWrapper";
import React from "react";
import AddMemberToCustomGroup from "../../../components/contents/groups/AddMemberToCustomGroup";

const AddMember:React.FC = () => {
    const router = useRouter();

    return (
        <LayoutWrapper>
            {/* @ts-ignore */}
            <AddMemberToCustomGroup grpId={router.asPath.split('/')[2]} grpName={router?.query.grp}/>
        </LayoutWrapper>
    )
}

export default AddMember;