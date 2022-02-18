import React from "react";
import LayoutWrapper from "../../components/ui/LayoutWrapper";
import CreateCustomGroup from "../../components/contents/groups/CreateCustomGroup";

const CustomGroup: React.FC = (props) => {
    return (
        <div>
            <LayoutWrapper>
                <CreateCustomGroup />
            </LayoutWrapper>
        </div>
    )
}

export default CustomGroup;