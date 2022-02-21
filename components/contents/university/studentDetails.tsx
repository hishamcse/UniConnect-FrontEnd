import styles from './studentDetails.module.scss';
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";

interface StudentItem  {
    ROLE_ID : number,
    FULL_NAME : string,
    EMAIL : string,
    SECTION_NAME : string,
    SECTION_ROLL_NO : number,
    TOKEN? : string
}
interface sectionItem  {
    SECTION_NAME : string,
    STUDENT_COUNT : number
}
const server = 'http://localhost:3000';


const StudentDetails: React.FC<{ userId: string, departmentName : string, 
    departmentId : string, batchId : string, batchYear : number}> = (props) => {


    const [students, setStudents] = useState<StudentItem[]>([]);
    const [fetching, setFetching] = useState<boolean>(false);
    const [sections, setSections] = useState<sectionItem[]>([]);
    const [inp, setInp] = useState<string>('');
    const [notClaimedOnly, setNotClaimedOnly] = useState<boolean>(false);


    const [selectedSections, setSelectedSections] = useState<string[]>([]);

    const fetchSections = ()=>{
    setFetching(true);
    
        fetch(server + '/sections/' + props.departmentId + '/' + props.batchId, {
            mode: 'cors',
            method: 'get',
            credentials: "include",
        })
        .then(resp =>{
            if(resp.status !== 200){
                throw new Error(resp.statusText);
            }
            return resp.json();
        })
        .then(data =>{
            setSections(data);
            // console.log(sections);
        })
        .catch(err=>{
            console.log(err);
        })
        .finally(()=>{
            setFetching(false);
        })

    }


    const loadData = (i : number, clear : boolean, secNames : string[], ingnoreInp = false, revert = false)=>{ 

        setFetching(true);
        fetch(server + `/students/${props.departmentId}/${props.batchId}/${i}/${inp.trim().length == 0 ? 'placeholder' : inp.trim()}`, {
            mode: 'cors',
            method: 'post',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                sectionNames : secNames,
                useName : (inp.trim().length >= 3) && (!ingnoreInp),
                notClaimedOnly : revert ?  !notClaimedOnly : notClaimedOnly 
            })
        })
        .then(resp =>{
            if(resp.status !== 200){
                throw new Error(resp.statusText);
            }
            return resp.json();
        })
        .then(data =>{
            if(clear){
                setStudents(data);
            }
            else
                setStudents([...students, ...data]);
        })
        .catch(err=>{
            console.log(err);
        })
        .finally(()=>{
            setFetching(false);
        })
    }


    useEffect(()=>{
        fetchSections();
        // loadData(0, true);
    }, [])

    return (
        <div className={styles.body}> 
            <div className={styles.container}>
                
                <div className = {styles.titleContainer}>
                    {props.departmentName.replaceAll('%20', ' ')}
                </div>
                <div className={styles.subTitleText}>
                Students - Year {props.batchYear}
                </div>
                <div>
                    <SectionList setStudents={setStudents} loadData={loadData} fetching = {fetching} 
                    selected={selectedSections} setSelected = {setSelectedSections} sections={sections} />
                    {/* {sections.map(s => s.STUDENT_COUNT)} */}
                </div>
                {!notClaimedOnly && 
                    <SearchField loadData={loadData} inp = {inp} setInp = {setInp} 
                    selected={selectedSections} fetching = {fetching}  />
                }
                
                <div className='p-2'>
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" 
                    checked = {notClaimedOnly} onClick = {()=>{
                            setNotClaimedOnly(c =>{
                                loadData(0, true, selectedSections, true, true);
                                return !c;
                            });
                        }} disabled = {fetching}/>
                    <label className="form-check-label"> &nbsp;Not claimed only</label>
                </div>
                <div className = {styles.listContainer}>
                    <StudentList loadData={loadData} selected = {selectedSections} fetching = {fetching} students = {students} />
                </div>
                <div>
                </div>
            </div>
            
        </div>
    );
}

const StudentList : React.FC<{
    students : StudentItem[],
    fetching : boolean,
    loadData : (n : number, c : boolean, st : string[]) => void,
    selected : string[]
}> = ({students, fetching, loadData, selected})=>{
    return(
        <ul className='list-group'>
            {students.map(item => <StudentItem item={item} key = {item.ROLE_ID} />)}
            {students.length >= 30 && 
            <div className='list-group-item text-center'>
                <button className={'btn btn-primary'} disabled={fetching} onClick={()=>{
                    if(fetching) return;
                    loadData(students[students.length-1].ROLE_ID, false,selected);
                }}>Load More</button>
            </div>
            } 
        </ul>
    )
}

const SectionList : React.FC<{
    sections : sectionItem[],
    selected : string[],
    setSelected : (s : string[]) => void,
    fetching : boolean,
    loadData : (n : number, clear : boolean, na : string[]) => void,
    setStudents : (arr : StudentItem[]) => void
}> = ({sections, selected, setSelected, fetching, loadData, setStudents})=>{
    return (
        <div className={styles.sectionListContainer}>
            {sections.map(s => <SectionItem setStudents={setStudents} loadData={loadData} fetching = {fetching} selected={selected} setSelected = {setSelected} item={s} key = {s.SECTION_NAME} />)}
        </div>
    )
}
const SectionItem : React.FC<{
    item : sectionItem
    selected : string[],
    setSelected : (s : string[]) => void,
    fetching : boolean,
    loadData : (n : number, clear : boolean, na : string[]) => void,
    setStudents : (arr : StudentItem[]) => void
}> = ({item, selected, setSelected, fetching, loadData, setStudents})=>{
    const [tik, setTik] = useState<boolean>(false);
    return(
        <div className={styles.sectionItemContainer}>
            <input className='form-check-input' type = 'checkbox' onClick={(e)=>{
                let newSelected : string[];
                if(tik){
                    newSelected = selected.filter(s => s != item.SECTION_NAME);
                    // setSelected(selected.filter(s => s != item.SECTION_NAME));
                }
                else{
                    newSelected = [...selected, item.SECTION_NAME]; 
                    // setSelected([...selected, item.SECTION_NAME])
                }
                setTik(v => !v);
                setSelected(newSelected);
                if(newSelected.length > 0){
                    loadData(0, true, newSelected);
                }
                else{
                    setStudents([]);
                }
                // else{
                //     setSelected([]);
                // }
                    // setTimeout(()=>loadData(0, true, newSelected), 100);
                // loadData(0,true);
            }} checked = {tik} disabled = {fetching} /> &nbsp;
            <label className="form-check-label">
                {item.SECTION_NAME + ` (${item.STUDENT_COUNT} Students)`}
            </label>
        </div>
    )
}

const SearchField : React.FC<{
        fetching : boolean,
        selected : string[],
        inp : string,
        setInp : (s : string) => void,
        loadData : (i : number, clear : boolean, selected : string[], ignore? : boolean) => void
    }> = (props)=>{
    let placeHolderText = props.selected.reduce((p, c) => p + ' ' + c, '');
    if(placeHolderText.length != 0){
        placeHolderText = 'Search students in section(s) ' + placeHolderText;
    }
    else{
        placeHolderText = 'Select a section to search'
    }
    return (
        <div>
            <div className={ styles.fieldContainer}>
                <input value={props.inp} onChange={(e)=>props.setInp(e.target.value)} 
                type = 'text' className={'form-control ' + styles.searchField} 
                placeholder = {placeHolderText} disabled = {props.selected.length == 0} />
            </div>
            <div className={styles.buttonsContainer}>
                <button className={'btn btn-primary ' + styles.buttonItem} 
                disabled = {(props.inp.trim().length < 3) || props.fetching} onClick = {()=>props.loadData(0,true,props.selected)}> Search </button>
                <button className={'btn btn-secondary '  + styles.buttonItem} disabled = {props.fetching} onClick = {()=>{
                        props.setInp('');
                        props.loadData(0, true, props.selected, true);
                    }} > Clear </button>
            </div>
        </div>
    )
}

const StudentItem : React.FC<{item : StudentItem}> = ({item})=>{
    return (
        <li className = {styles.itemContainer + ' list-group-item' }>
            
            <table className = {styles.itemTable}>
                <tr className={styles.tableRow}>
                    <td className = {styles.firstColumn}>Name</td>
                    <td>{item.FULL_NAME}</td>
                </tr>
                
                <tr className={styles.tableRow}>
                    <td className = {styles.firstColumn}>Id</td>
                    <td>{item.ROLE_ID}</td>
                    
                </tr>
                
                <tr className={styles.tableRow}>
                    <td className = {styles.firstColumn}>Email</td>
                    <td>{item.EMAIL}</td>
                </tr>
                
                <tr className={styles.tableRow}>
                    <td className = {styles.firstColumn}>Section</td>
                    <td>{item.SECTION_NAME}</td>
                </tr>
                
                <tr className={styles.tableRow}>
                    <td className = {styles.firstColumn}>Roll No</td>
                    <td>{item.SECTION_ROLL_NO}</td>
                </tr>
                { item.TOKEN &&
                <tr className={styles.tableRow}>
                    <td className = {styles.firstColumn}>Generated Password</td>
                    <td>{item.TOKEN}</td>
                </tr>}
            </table>
        </li>
    )
}

export default StudentDetails;