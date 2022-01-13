import {Accordion, Button} from "react-bootstrap";
import React from "react";
import {BsFillHddStackFill, BsFillPatchPlusFill} from "react-icons/bs";
import BatchInfo from "./BatchInfo";
import {useRouter} from "next/router";
import {BatchInfoView} from "../../../models/University/Batch";

const Batches: React.FC<{ batches: BatchInfoView[], userId: string }> = (props) => {

    const router = useRouter();

    const addBatch = async (e: React.MouseEvent) => {
        e.preventDefault();

        await router.push(`${props.userId}/addBatch`);
    }

    return (
        <Accordion.Item eventKey="1">
            <Accordion.Header>
                <BsFillHddStackFill />&nbsp;&nbsp;
                <h4>Batches</h4>
            </Accordion.Header>
            <Accordion.Body>
                <h5 className='text-lg-left'>
                    <Accordion className='p-2'>
                        {props.batches.map((batch, i) => {
                            let arr = new Uint32Array(10)
                            return (
                                <Accordion.Item eventKey={`${i}`} key={i + batch.batch_name + crypto.getRandomValues(arr)}>
                                    <Accordion.Header>Batch {batch.batch_year} : {batch.batch_type}</Accordion.Header>
                                    <BatchInfo batch={batch} userId={props.userId}/>
                                </Accordion.Item>
                            )
                        })}
                    </Accordion>
                </h5><br/>
                <Button className='btn-danger' onClick={addBatch}>
                    <BsFillPatchPlusFill />&nbsp;
                    Add Batch
                </Button>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default Batches;