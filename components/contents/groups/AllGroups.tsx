import React, {useEffect, useState} from "react";
import SingleGroup from "./SingleGroup";
import styles from "./AllGroups.module.scss";
import {GroupSummaryView} from "../../../models/GroupData";
import {Grid} from "@mui/material";

const server = 'http://localhost:3000';

const AllGroups: React.FC<{ mode: string, userId: string }> = (props) => {

    const [defaultGroups, setDefaultGroups] = useState<GroupSummaryView[]>([]);
    const [customGroups, setCustomGroups] = useState<GroupSummaryView[]>([]);

    useEffect(() => {
        fetch(`${server}/groups/defaults`, {
            mode: 'cors',
            method: 'get',
            credentials: "include",
        })
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                setDefaultGroups(data);
            });

        fetch(`${server}/groups/custom`, {
            mode: 'cors',
            method: 'get',
            credentials: "include",
        })
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                setCustomGroups(data);
            });
    }, [])

    return (
        <div className='m-5 p-3'>
            <div className={`${styles.heading} ${styles['background-default']} p-3`}>
                <h2>Default Groups</h2>
            </div>

            {defaultGroups.length !== 0 &&
                <Grid className={`mt-5 mb-5`} container alignItems='stretch' direction='row'>
                    <Grid item className='row' xs>
                    {defaultGroups.map((grp, index) =>
                        <div className='col-md-4' key={Math.random().toString() + index}>
                            <SingleGroup key={Math.random().toString() + index} groupData={grp} type='default'/>
                        </div>
                    )}
                    </Grid>
                </Grid>
            }

            {defaultGroups.length === 0 &&
                <div className='m-5 p-5'>
                    <h4>There is no default group to show</h4>
                </div>
            }

            <div className={`${styles.heading} ${styles['background-custom']} p-3`}>
                <h2>Custom Groups</h2>
            </div>

            {customGroups.length ! == 0 &&
                <div className='d-flex'>
                    {customGroups.map((grp, index) =>
                        <SingleGroup key={Math.random().toString() + index} groupData={grp} type='default'/>)
                    }
                </div>
            }

            {customGroups.length === 0 &&
                <div className='m-5 p-5'>
                    <h4>There is no custom group to show</h4>
                </div>
            }
        </div>
    );
}

export default AllGroups;