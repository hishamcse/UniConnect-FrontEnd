import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from './TeacherDetails.module.scss';
import SearchTeacher from "./SearchTeacher";
import TeacherItemC from "./TeacherItem";
import {BsFillCaretLeftFill} from "react-icons/bs";
import {Button} from "react-bootstrap";
import {Teacher} from "../../../../models/University/Teacher";

const server = 'http://localhost:3000';

const TeacherDetails: React.FC<{ userId: string, departmentName: string, departmentId: string }> = (props) => {

    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [fetching, setFetching] = useState<boolean>(false);
    const [notClaimedOnly, setNotClaimedOnly] = useState<boolean>(false);

    const router = useRouter();

    const searchReq = (name: string) => {

        setFetching(true);
        fetch(server + '/teachers/search/' + props.departmentId + '/' + name, {
            mode: 'cors',
            method: 'get',
            credentials: "include",
        })
            .then(resp => {
                if (resp.status !== 200) {
                    throw new Error(resp.statusText);
                }
                return resp.json();
            })
            .then(data => {
                setTeachers(data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setFetching(false);
            })
    }

    const loadData = (i: number, clear: boolean, notClaimedOnly = false) => {

        setFetching(true);
        fetch(server + '/teachers/details/' + props.departmentId + '/' + i + '/' + notClaimedOnly.toString(), {
            mode: 'cors',
            method: 'get',
            credentials: "include",
        })
            .then(resp => {
                if (resp.status !== 200) {
                    throw new Error(resp.statusText);
                }
                return resp.json();
            })
            .then(data => {
                if (clear) {
                    setTeachers(data);
                } else
                    setTeachers([...teachers, ...data]);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setFetching(false);
            })
    }

    useEffect(() => {
        loadData(0, true);
    }, [])

    const backHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await router.back();
    }

    return (
        <div className={styles.body}>

            <div className={styles.container}>

                <div className={styles.buttonContainer}>
                    <Button variant='outline-danger' onClick={backHandler}>
                        <BsFillCaretLeftFill/>&nbsp;
                        Back
                    </Button>
                </div>

                <div className={styles.titleContainer}>
                    {props.departmentName?.replaceAll('%20', ' ')}
                </div>
                <div className={styles.subTitleText}>
                    Teachers
                </div>

                {!notClaimedOnly &&
                    <SearchTeacher fetching={fetching} search={searchReq} loadData={loadData}/>}

                <div className='p-2'>
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"
                           checked={notClaimedOnly} onClick={() => {
                        loadData(0, true, !notClaimedOnly);
                        setNotClaimedOnly(c => !c);

                    }} disabled={fetching}/>
                    <label className="form-check-label"> &nbsp;Not claimed only</label>
                </div>

                <div className={styles.listContainer}>
                    <ul className='list-group'>
                        {teachers.map(item => <TeacherItemC item={item} key={item.ROLE_ID}/>)}
                        {teachers.length >= 30 &&
                            <div className='list-group-item text-center'>
                                <button className={'btn btn-primary'} disabled={fetching} onClick={() => {
                                    if (fetching) return;
                                    loadData(teachers[teachers.length - 1].ROLE_ID, false);
                                }}>Load More
                                </button>
                            </div>
                        }
                    </ul>
                </div>
                <div>
                </div>
            </div>

        </div>
    );
}

export default TeacherDetails;