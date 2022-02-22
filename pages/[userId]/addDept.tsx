import AddDepartment from "../../components/contents/management/AddDepartment";
import {useRouter} from "next/router";
import LayoutWrapper from "../../components/ui/LayoutWrapper";
import React from "react";

const AddDept = () => {

    const router = useRouter();

    return (
        <LayoutWrapper>
            <AddDepartment userId={router.asPath.split('/')[1]} />
        </LayoutWrapper>
    )
}

export default AddDept;