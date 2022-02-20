import styles from './studentDetails.module.scss';
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";

interface StudentItem  {
    ROLE_ID : number,
    FULL_NAME : string,
    RANK : string,
    EMAIL : string
}
const server = 'http://localhost:3000';


const StudentDetails: React.FC<{ userId: string, departmentName : string, 
    departmentId : string, batchId : string, batchYear : number}> = (props) => {


    const [students, setStudents] = useState<StudentItem[]>([]);
    const [fetching, setFetching] = useState<boolean>(false);
    const [sections, setSections] = useState<string[]>([]);

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
            setSections(data.map((d: { SECTION_NAME: any; }) => d.SECTION_NAME));
        })
        .catch(err=>{
            console.log(err);
        })
        .finally(()=>{
            setFetching(false);
        })

    }
    // const searchReq = (name : string)=>{
        
    //     setFetching(true);

    //     fetch(server + '/teachers/search/' + props.departmentId + '/' + name, {
    //         mode: 'cors',
    //         method: 'get',
    //         credentials: "include",
    //     })
    //     .then(resp =>{
    //         if(resp.status !== 200){
    //             throw new Error(resp.statusText);
    //         }
    //         return resp.json();
    //     })
    //     .then(data =>{
    //         setTeachers(data);
    //     })
    //     .catch(err=>{
    //         console.log(err);
    //     })
    //     .finally(()=>{
    //         setFetching(false);
    //     })
    // }


    // const loadData = (i : number, clear : boolean)=>{
    //     setFetching(true);
    //     fetch(server + '/teachers/details/' + props.departmentId + '/' + i, {
    //         mode: 'cors',
    //         method: 'get',
    //         credentials: "include",
    //     })
    //     .then(resp =>{
    //         if(resp.status !== 200){
    //             throw new Error(resp.statusText);
    //         }
    //         return resp.json();
    //     })
    //     .then(data =>{
    //         if(clear){
    //             setStudents(data);
    //         }
    //         else
    //             setS([...teachers, ...data]);
    //     })
    //     .catch(err=>{
    //         console.log(err);
    //     })
    //     .finally(()=>{
    //         setFetching(false);
    //     })
    // }


    useEffect(()=>{
        fetchSections();
        // loadData(0, true);
    }, [])

    // const router = useRouter();

    // const backHandler = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     await router.push(`/${props.userId}`);
    // }

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
                    {sections.map(s => s)}
                </div>
                {/* <SearchField fetching = {fetching} search={searchReq} loadData = {loadData} /> */}
                <div className = {styles.listContainer}>
                    <ul className='list-group'>
                        {/* {students.map(item => <TeacherItem item={item} key = {item.ROLE_ID} />)} */}
                        {students.length >= 30 && 
                        <div className='list-group-item text-center'>
                            <button className={'btn btn-primary'} disabled={fetching} onClick={()=>{
                                if(fetching) return;
                                // loadData(teachers[teachers.length - 1].ROLE_ID, false);
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

// const StudentItem : React.FC<{item : StudentItem}> = ({item})=>{
//     return (
//         <li className = {styles.itemContainer + ' list-group-item' }>
            
//             <table className = {styles.itemTable}>
//                 <tr className={styles.tableRow}>
//                     <td className = {styles.firstColumn}>Name</td>
//                     <td>{item.FULL_NAME}</td>
//                 </tr>
                
//                 <tr className={styles.tableRow}>
//                     <td className = {styles.firstColumn}>Id</td>
//                     <td>{item.ROLE_ID}</td>
                    
//                 </tr>
                
//                 <tr className={styles.tableRow}>
//                     <td className = {styles.firstColumn}>
//                         Rank
//                     </td>
//                     <td>
//                         {item.RANK}
//                     </td>
//                 </tr>
//                 <tr className={styles.tableRow}>
//                     <td className = {styles.firstColumn}>Email</td>
//                     <td>{item.EMAIL}</td>
//                 </tr>
//             </table>
//         </li>
//     )
// }

export default StudentDetails;