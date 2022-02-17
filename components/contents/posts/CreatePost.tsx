import React, {useRef, useState} from "react";
import {useRouter} from "next/router";
import styles from "./Posts.module.scss";
import {Button, Form} from "react-bootstrap";
import {BsFillCaretLeftFill, BsFillSignpost2Fill} from "react-icons/bs";
import {CgDetailsMore} from "react-icons/cg"

const server = 'http://localhost:3000';

const CreatePost: React.FC<{ grpId: string, grp_name: string | string[] | undefined }> = (props) => {

    const inputTitleRef = useRef<HTMLTextAreaElement | null>(null);
    const inputBodyRef = useRef<HTMLTextAreaElement | null>(null);

    const [invalid,setInvalid] = useState(false);

    const router = useRouter();

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const title = inputTitleRef.current?.value;
        const text = inputBodyRef.current?.value;

        if(!title || !text || title?.trim().length === 0 || text?.trim().length === 0) {
            setInvalid(true);
            return;
        }

        setInvalid(false);

        fetch(`${server}/posts/${props.grpId}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                title: title,
                text: text
            })
        }).then(resp => {
            return resp.json();
        }).then(_ => {
        })

        await router.push(`/groups/${props.grpId}`);
    }

    const backHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await router.push(`/groups/${props.grpId}`);
    }

    return (
        <div className={styles.body}>
            <Button variant='danger' onClick={backHandler}>
                <BsFillCaretLeftFill/>&nbsp;
                Back
            </Button>

            <Form className={`${styles.content} text-center`} onSubmit={submitHandler}>
                <div className={styles['form-header']}>
                    <h4>Post at {props.grp_name}</h4>
                </div>

                <div className={`${styles.id}`}>
                    <Form.Group className="mb-4 mt-5">
                        <label htmlFor="floatingInputCustom">
                            <BsFillSignpost2Fill/>&nbsp;
                            <b>Title</b>
                        </label>
                        <Form.Control className='mt-2'
                            as='textarea' rows={2}
                            id="floatingInputCustom"
                            type="text"
                            placeholder="title of the post"
                            ref={inputTitleRef}
                        />
                    </Form.Group>
                </div>

                <Form.Group className="mb-4">
                    <label htmlFor="floatingBodyCustom">
                        <CgDetailsMore/>&nbsp;
                        <b>Content</b>
                    </label>
                    <Form.Control className='mt-2'
                        as='textarea' rows={7} id="floatingBodyCustom"
                        placeholder="text"
                        ref={inputBodyRef}
                    />
                </Form.Group>

                {invalid && <p className='text-danger'>Warning!! Empty title or content</p>}

                <Button className={`${styles.button} mb-2`} variant="info" size="lg" type='submit'>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CreatePost;