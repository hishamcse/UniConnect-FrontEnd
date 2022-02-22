import React, {useEffect, useState} from "react";
import styles from './StudentDetails.module.scss';
import SectionList from "./SectionList";
import SearchStudent from "./SearchStudent";
import StudentList from "./StudentList";
import {BsFillCaretLeftFill} from "react-icons/bs";
import {Button} from "react-bootstrap";
import {useRouter} from "next/router";
import {Student} from "../../../../models/University/Student";
import {Section} from "../../../../models/University/Section";


const server = 'http://localhost:3000';

const StudentDetails: React.FC<{
    userId: string, departmentName: string, departmentId: string, batchId: string, batchYear: string
}> = (props) => {

    const [students, setStudents] = useState<Student[]>([]);
    const [fetching, setFetching] = useState<boolean>(false);
    const [sections, setSections] = useState<Section[]>([]);
    const [inp, setInp] = useState<string>('');
    const [notClaimedOnly, setNotClaimedOnly] = useState<boolean>(false);

    const [selectedSections, setSelectedSections] = useState<string[]>([]);

    const router = useRouter();

    const fetchSections = () => {
        setFetching(true);

        fetch(server + '/sections/' + props.departmentId + '/' + props.batchId, {
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
                setSections(data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setFetching(false);
            })
    }

    const loadData = (i: number, clear: boolean, secNames: string[], ignoreInp = false, revert = false) => {

        setFetching(true);
        fetch(server + `/students/${props.departmentId}/${props.batchId}/${i}/${inp.trim().length == 0 ? 'placeholder' : inp.trim()}`, {
            mode: 'cors',
            method: 'post',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sectionNames: secNames,
                useName: (inp.trim().length >= 3) && (!ignoreInp),
                notClaimedOnly: revert ? !notClaimedOnly : notClaimedOnly
            })
        })
            .then(resp => {
                if (resp.status !== 200) {
                    throw new Error(resp.statusText);
                }
                return resp.json();
            })
            .then(data => {
                if (clear) {
                    setStudents(data);
                } else
                    setStudents([...students, ...data]);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setFetching(false);
            })
    }

    useEffect(() => {
        fetchSections();
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
                    Students - Year {props.batchYear}
                </div>

                <div>
                    <SectionList setStudents={setStudents} loadData={loadData} fetching={fetching}
                                 selected={selectedSections} setSelected={setSelectedSections} sections={sections}/>
                </div>

                {!notClaimedOnly &&
                    <SearchStudent loadData={loadData} inp={inp} setInp={setInp}
                                   selected={selectedSections} fetching={fetching}/>
                }

                <div className='p-2'>
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"
                           checked={notClaimedOnly} onClick={() => {
                        setNotClaimedOnly(c => {
                            loadData(0, true, selectedSections, true, true);
                            return !c;
                        });
                    }} disabled={fetching}/>
                    <label className="form-check-label"> &nbsp;Not claimed only</label>
                </div>
                <div className={styles.listContainer}>
                    <StudentList loadData={loadData} selected={selectedSections} fetching={fetching}
                                 students={students}/>
                </div>
                <div>
                </div>
            </div>

        </div>
    );
}

export default StudentDetails;