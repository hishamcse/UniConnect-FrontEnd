import React from "react";
import styles from './StudentDetails.module.scss';

const SearchStudent: React.FC<{ fetching: boolean, selected: string[], inp: string,
    setInp: (s: string) => void, loadData: (i: number, clear: boolean, selected: string[], ignore?: boolean) => void
}> = (props) => {

    let placeHolderText = props.selected.reduce((p, c) => p + ' ' + c, '');
    if (placeHolderText.length != 0) {
        placeHolderText = 'Search students in section(s) ' + placeHolderText;
    } else {
        placeHolderText = 'Select a section to search'
    }

    return (
        <div>
            <div className={styles.fieldContainer}>
                <input value={props.inp} onChange={(e) => props.setInp(e.target.value)}
                       type='text' className={'form-control ' + styles.searchField}
                       placeholder={placeHolderText} disabled={props.selected.length == 0}/>
            </div>

            <div className={styles.buttonsContainer}>
                <button className={'btn btn-primary ' + styles.buttonItem}
                        disabled={(props.inp.trim().length < 3) || props.fetching}
                        onClick={() => props.loadData(0, true, props.selected)}> Search
                </button>

                <button className={'btn btn-secondary ' + styles.buttonItem} disabled={props.fetching} onClick={() => {
                    props.setInp('');
                    props.loadData(0, true, props.selected, true);
                }}> Clear
                </button>
            </div>
        </div>
    )
}

export default SearchStudent;