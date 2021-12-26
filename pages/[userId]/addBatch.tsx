import {useRouter} from "next/router";
import LayoutWrapper from "../../components/ui/LayoutWrapper";
import AddBatchNew from "../../components/contents/admin/AddBatchNew";

const AddBatch = () => {

    const router = useRouter();

    return (
        <LayoutWrapper>
            <AddBatchNew userId={router.asPath.split('/')[1]} />
        </LayoutWrapper>
    )
}

export default AddBatch;