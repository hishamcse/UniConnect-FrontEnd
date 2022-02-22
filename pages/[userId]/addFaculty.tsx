import {useRouter} from "next/router";
import LayoutWrapper from "../../components/ui/LayoutWrapper";
import React from "react";
import AddTeacher from "../../components/contents/management/AddTeacher";

const AddFaculty: React.FC = (props) => {
    const router = useRouter();

    return (
        <LayoutWrapper>
            <AddTeacher userId={router.asPath.split('/')[1]}
                               deptId={router.query.deptId?.toString()} deptName={router.query.deptName?.toString()}/>
        </LayoutWrapper>
    )
}

export default AddFaculty;