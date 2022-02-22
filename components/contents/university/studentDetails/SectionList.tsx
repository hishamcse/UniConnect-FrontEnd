import React from "react";
import styles from './StudentDetails.module.scss';
import SectionItem from "./SectionItem";
import {Section} from "../../../../models/University/Section";
import {Student} from "../../../../models/University/Student";

const SectionList: React.FC<{
    sections: Section[],
    selected: string[],
    setSelected: (s: string[]) => void,
    fetching: boolean,
    loadData: (n: number, clear: boolean, na: string[]) => void,
    setStudents: (arr: Student[]) => void
}> = ({sections, selected, setSelected, fetching, loadData, setStudents}) => {

    return (
        <div className={styles.sectionListContainer}>
            {sections.map(s => <SectionItem setStudents={setStudents} loadData={loadData} fetching={fetching}
                                            selected={selected} setSelected={setSelected} item={s}
                                            key={s.SECTION_NAME}/>)}
        </div>
    )
}

export default SectionList;