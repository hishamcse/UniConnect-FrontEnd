import {Accordion, Button} from "react-bootstrap";
import {BsFillHddStackFill, BsFillPatchPlusFill} from "react-icons/bs";
import React from "react";
import DeptInfo from "./DeptInfo";
import {useRouter} from "next/router";

const Departments: React.FC<{ departments: string[], userId: string }> = (props) => {

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
                                <Accordion.Item eventKey={`${i}`} key={dept}>
                                    <Accordion.Header>{dept}</Accordion.Header>
                                    <DeptInfo deptName='Computer Science & Engineering'/>
                                </Accordion.Item>
                            )
                        })}
                    </Accordion>
                </h5><br/>
                <Button className='btn-danger' onClick={addDept}>
                    <BsFillPatchPlusFill/>&nbsp;
                    Add Department
                </Button>
            </Accordion.Body>
        </Accordion.Item>
    );
}

export default Departments;