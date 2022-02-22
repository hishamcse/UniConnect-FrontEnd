import React from "react";
import styles from './StudentDetails.module.scss';
import {Card, CardContent} from "@mui/material";

import {StudentItem} from "../../../../models/University/Student";

const StudentItem: React.FC<{ item: StudentItem }> = ({item}) => {

    return (
        // <Card>
        //     <CardContent>
                <li className={styles.itemContainer + ' list-group-item'}>

                    <table className={styles.itemTable}>
                        <tr className={styles.tableRow}>
                            <td className={styles.firstColumn}>Name</td>
                            <td>{item.FULL_NAME}</td>
                        </tr>

                        <tr className={styles.tableRow}>
                            <td className={styles.firstColumn}>Id</td>
                            <td>{item.ROLE_ID}</td>

                        </tr>

                    <tr className={styles.tableRow}>
                            <td className={styles.firstColumn}>Email</td>
                            <td>{item.EMAIL}</td>
                        </tr>

                        <tr className={styles.tableRow}>
                            <td className={styles.firstColumn}>Section</td>
                            <td>{item.SECTION_NAME}</td>
                        </tr>

                        <tr className={styles.tableRow}>
                            <td className={styles.firstColumn}>Roll No</td>
                            <td>{item.SECTION_ROLL_NO}</td>
                        </tr>
                        {item.TOKEN &&
                            <tr className={styles.tableRow}>
                                <td className={styles.firstColumn}>Token</td>
                                <td>{item.TOKEN}</td>
                            </tr>}
                    </table>
                </li>
        //     </CardContent>
        // </Card>
    )
}

export default StudentItem;