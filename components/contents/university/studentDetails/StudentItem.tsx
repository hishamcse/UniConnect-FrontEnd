import React from "react";
import styles from './StudentDetails.module.scss';
import {Card, CardContent} from "@mui/material";

const StudentItem: React.FC<{ item: StudentItem }> = ({item}) => {

    return (
        <Card>
            <CardContent>
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
                        {item.GENERATED_PASS &&
                            <tr className={styles.tableRow}>
                                <td className={styles.firstColumn}>Generated Password</td>
                                <td>{item.GENERATED_PASS}</td>
                            </tr>}
                    </table>
                </li>
            </CardContent>
        </Card>
    )
}

export default StudentItem;