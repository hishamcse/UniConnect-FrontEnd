import React, {useState} from "react";
import styles from './StudentDetails.module.scss';
import {sectionItem} from "../../../../models/University/Section";
import {StudentItem} from "../../../../models/University/Student";

const SectionItem: React.FC<{
    item: sectionItem
    selected: string[],
    setSelected: (s: string[]) => void,
    fetching: boolean,
    loadData: (n: number, clear: boolean, na: string[]) => void,
    setStudents: (arr: StudentItem[]) => void
}> = ({item, selected, setSelected, fetching, loadData, setStudents}) => {

    const [tik, setTik] = useState<boolean>(false);

    const tikHandler = (e : any) => {
        e.preventDefault();

        let newSelected: string[] = tik ? selected.filter(s => s != item.SECTION_NAME): [...selected, item.SECTION_NAME];

        setTik(v => !v);
        setSelected(newSelected);

        if (newSelected.length > 0) {
            loadData(0, true, newSelected);
        } else {
            setStudents([]);
        }
    }

    return (
        <div className={styles.sectionItemContainer}>
            <input className='form-check-input' type='checkbox' onChange={tikHandler} checked={tik} disabled={fetching}/> &nbsp;
            <label className="form-check-label">
                {item.SECTION_NAME + ` (${item.STUDENT_COUNT} Students)`}
            </label>
        </div>
    )
}

export default SectionItem;