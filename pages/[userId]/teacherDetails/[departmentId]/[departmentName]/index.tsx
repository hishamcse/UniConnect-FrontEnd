import { useRouter } from "next/router";
import TeacherDetailsComp from "../../../../../components/contents/university/teacherDetails";
import LayoutWrapper from "../../../../../components/ui/LayoutWrapper";

const TeacherDetails = () => {

    const router = useRouter();

    return (
        <LayoutWrapper>
            <TeacherDetailsComp   userId={router.asPath.split('/')[1]} departmentId = {router.asPath.split('/')[3]} departmentName = {router.asPath.split('/')[4]} />
        </LayoutWrapper>
    )
}

export default TeacherDetails;