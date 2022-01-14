import {useRouter} from "next/router";
import LayoutWrapper from "../../components/ui/LayoutWrapper";
import AddSectionStudent from "../../components/contents/admin/AddSectionStudent";
import React, {useEffect, useState} from "react";

const AddSecStudent: React.FC = (props) => {
    const router = useRouter();

    return (
        <LayoutWrapper>
            <AddSectionStudent userId={router.asPath.split('/')[1]}
                               batchId={router.query.batchId}/>
        </LayoutWrapper>
    )
}

export default AddSecStudent;