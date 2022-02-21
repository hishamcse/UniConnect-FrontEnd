import styles from './teacherDetails.module.scss';
import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {Button, Form} from "react-bootstrap";
import {BsBuilding, BsFillCaretLeftFill, BsFillSignpost2Fill} from "react-icons/bs";

interface TeacherItem  {
    ROLE_ID : number,
    FULL_NAME : string,
    RANK : string,
    EMAIL : string,
    TOKEN? : string
}
const server = 'http://localhost:3000';


const TeacherDetailsComp: React.FC<{ userId: string, departmentName : string, departmentId : string }> = (props) => {


    const [teachers, setTeachers] = useState<TeacherItem[]>([]);
    const [fetching, setFetching] = useState<boolean>(false);
    const [notClaimedOnly, setNotClaimedOnly] = useState<boolean>(false);
    
    const searchReq = (name : string)=>{
        
        setFetching(true);
        fetch(server + '/teachers/search/' + props.departmentId + '/' + name, {
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
            setTeachers(data);
        })
        .catch(err=>{
            console.log(err);
        })
        .finally(()=>{
            setFetching(false);
        }) 
    }


    const loadData = (i : number, clear : boolean, notClaimedOnly = false)=>{
        setFetching(true);
        fetch(server + '/teachers/details/' + props.departmentId + '/' + i + '/' + notClaimedOnly.toString(), {
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
            if(clear){
                setTeachers(data);
            }
            else
                setTeachers([...teachers, ...data]);
        })
        .catch(err=>{
            console.log(err);
        })
        .finally(()=>{
            setFetching(false);
        })
    }

    useEffect(()=>{
        loadData(0, true);
    }, [])

    const router = useRouter();

    const backHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await router.push(`/${props.userId}`);
    }

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                
                <div className = {styles.titleContainer}>
                    {props.departmentName.replaceAll('%20', ' ')}
                </div>
                <div className={styles.subTitleText}>
                Teachers
                </div>
                {!notClaimedOnly && 
                <SearchField fetching = {fetching} search={searchReq} loadData = {loadData} />
                
                }
                <div className='p-2'>
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" 
                    checked = {notClaimedOnly} onClick = {()=>{
                            loadData(0, true, !notClaimedOnly);
                            setNotClaimedOnly(c => !c);

                        }} disabled = {fetching}/>
                    <label className="form-check-label"> &nbsp;Not claimed only</label>
                </div>
                <div className = {styles.listContainer}>
                    <ul className='list-group'>
                        {teachers.map(item => <TeacherItem item={item} key = {item.ROLE_ID} />)}
                        {teachers.length >= 30 && 
                        <div className='list-group-item text-center'>
                            <button className={'btn btn-primary'} disabled={fetching} onClick={()=>{
                                if(fetching) return;
                                loadData(teachers[teachers.length - 1].ROLE_ID, false);
                            }}>Load More</button>
                        </div>
                        } 
                    </ul>
                </div>
                <div>
                </div>
            </div>
            {/* <Button variant='danger' onClick={backHandler}>
                <BsFillCaretLeftFill/>&nbsp;
                Back
            </Button> */}
            
        </div>
    );
}

const SearchField : React.FC<{ search : (n : string) => void, loadData : (i : number, c : boolean) => void, fetching : boolean}> = (props)=>{
    const [inp, setInp] = useState<string>('');
    
    return (
        <div>
            <div className={ styles.fieldContainer}>
                <input value={inp} onChange={(e)=>setInp(e.target.value)} type = 'text' className={'form-control ' + styles.searchField} placeholder = 'Search teachers by name' />
            </div>
            <div className={styles.buttonsContainer}>
                <button className={'btn btn-primary ' + styles.buttonItem} disabled = {(inp.trim().length < 3) || props.fetching} onClick = {()=>props.search(inp)}> Search </button>
                <button className={'btn btn-secondary '  + styles.buttonItem} disabled = {props.fetching} onClick = {()=>{
                        props.loadData(0, true);
                        setInp('');
                    }} > Clear </button>
            </div>
        </div>
    )
}


const TeacherItem : React.FC<{item : TeacherItem}> = ({item})=>{
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
                    <td className = {styles.firstColumn}>
                        Rank
                    </td>
                    <td>
                        {item.RANK}
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className = {styles.firstColumn}>Email</td>
                    <td>{item.EMAIL}</td>
                </tr>
                
                { item.TOKEN &&
                <tr className={styles.tableRow}>
                    <td className = {styles.firstColumn}>Generated Token</td>
                    <td>{item.TOKEN}</td>
                </tr>}
            </table>
        </li>
    )
}


export default TeacherDetailsComp;