import {useRouter} from "next/router";
import LayoutWrapper from "../../components/ui/LayoutWrapper";
import React from "react";
import TeacherDetails from "../../components/contents/university/teacherDetails/TeacherDetails";

const TeacherFullDetails = () => {

    const router = useRouter();

    return (
        <LayoutWrapper>
            {/* @ts-ignore */}
            <TeacherDetails departmentId = {router.query.deptId} departmentName = {router.query.dept}
                            userId={router.asPath.split('/')[1]}/>
        </LayoutWrapper>
    )
}

export default TeacherFullDetails;