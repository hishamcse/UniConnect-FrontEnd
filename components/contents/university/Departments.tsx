import {Accordion, Button} from "react-bootstrap";
import {BsFillHddStackFill, BsFillPatchPlusFill} from "react-icons/bs";
import React from "react";
import DeptInfo from "./DeptInfo";
import {useRouter} from "next/router";
import {DeptInfoView} from "../../../models/University/Department";

const Departments: React.FC<{ mode: string, userId: string, departments: DeptInfoView[] }> = (props) => {

    const router = useRouter();

    const addDept = async (e: React.MouseEvent) => {
        e.preventDefault();

        await router.push(`${props.userId}/addDept`);
    }

    return (
        <Accordion.Item eventKey="0">
            <Accordion.Header>
                <BsFillHddStackFill/>&nbsp;&nbsp;
                <h4>
                    Departments
                </h4>
            </Accordion.Header>
            <Accordion.Body>
                <h5 className='text-lg-left'>
                    <Accordion className='p-2'>
                        {props.departments.map((dept, i) => {
                            return (
                                <Accordion.Item eventKey={`${i}`} key={i + dept.dept_short}>
                                    <Accordion.Header>{dept.dept_short}</Accordion.Header>
                                    <DeptInfo deptInfo={dept} userId={props.userId}/>
                                </Accordion.Item>
                            )
                        })}
                    </Accordion>
                </h5><br/>
                {props.mode === 'admin' && <Button className='btn-danger' onClick={addDept}>
                    <BsFillPatchPlusFill/>&nbsp;
                    Add Department
                </Button>}
            </Accordion.Body>
        </Accordion.Item>
    );
}

export default Departments;