import React from "react";
import {useRouter} from "next/router";
import LayoutWrapper from "../../components/ui/LayoutWrapper";
import AddDepartmentBatch from "../../components/contents/management/AddDepartmentBatch";

const AddDeptBatch: React.FC = (props) => {
    const router = useRouter();

    return (
        <LayoutWrapper>
            <AddDepartmentBatch userId={router.asPath.split('/')[1]} batchId={router.query.batchId}/>
        </LayoutWrapper>
    )
}

export default AddDeptBatch;