import {useRouter} from "next/router";
import LayoutWrapper from "../../components/ui/LayoutWrapper";
import AddSectionStudent from "../../components/contents/admin/AddSectionStudent";
import React from "react";

const AddSecStudent: React.FC = (props) => {
    const router = useRouter();

    return (
        <LayoutWrapper>
            <AddSectionStudent userId={router.asPath.split('/')[1]} />
        </LayoutWrapper>
    )
}

export default AddSecStudent;