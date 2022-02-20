import React, {useState} from "react";
import styles from './TeacherDetails.module.scss';

const SearchTeacher: React.FC<{ search: (n: string) => void, loadData: (i: number, c: boolean) => void, fetching: boolean }> = (props) => {

    const [inp, setInp] = useState<string>('');

    return (
        <div>
            <div className={styles.fieldContainer}>
                <input value={inp} onChange={(e) => setInp(e.target.value)} type='text'
                       className={'form-control ' + styles.searchField} placeholder='Search teachers by name'/>
            </div>
            <div className={styles.buttonsContainer}>
                <button className={'btn btn-primary ' + styles.buttonItem}
                        disabled={(inp.trim().length < 3) || props.fetching} onClick={() => props.search(inp)}> Search
                </button>
                <button className={'btn btn-secondary ' + styles.buttonItem} disabled={props.fetching} onClick={() => {
                    props.loadData(0, true);
                    setInp('');
                }}> Clear
                </button>
            </div>
        </div>
    )
}

export default SearchTeacher;