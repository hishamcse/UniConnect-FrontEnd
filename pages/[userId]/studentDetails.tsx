import {useRouter} from "next/router";
import LayoutWrapper from "../../components/ui/LayoutWrapper";
import React from "react";
import StudentDetails from "../../components/contents/university/studentDetails/StudentDetails";

const StudentFullDetails = () => {

    const router = useRouter();

    return (
        <LayoutWrapper>
            {/* @ts-ignore */}
            <StudentDetails departmentId = {router.query.deptId} departmentName = {router.query.dept} batchId={router.query.batchId} batchYear={router.query.year}
                            userId={router.asPath.split('/')[1]} />
        </LayoutWrapper>
    )
}

export default StudentFullDetails;