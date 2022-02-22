import React from "react";
import styles from './StudentDetails.module.scss';
import SectionItemC from "./SectionItem";

import {sectionItem} from "../../../../models/University/Section";
import {StudentItem} from "../../../../models/University/Student";

const SectionList: React.FC<{
    sections: sectionItem[],
    selected: string[],
    setSelected: (s: string[]) => void,
    fetching: boolean,
    loadData: (n: number, clear: boolean, na: string[]) => void,
    setStudents: (arr: StudentItem[]) => void
}> = ({sections, selected, setSelected, fetching, loadData, setStudents}) => {

    return (
        <div className={styles.sectionListContainer}>
            {sections.map(s => <SectionItemC setStudents={setStudents} loadData={loadData} fetching={fetching}
                                            selected={selected} setSelected={setSelected} item={s}
                                            key={s.SECTION_NAME}/>)}
        </div>
    )
}

export default SectionList;