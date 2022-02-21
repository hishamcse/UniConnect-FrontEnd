import React from "react";
import styles from './TeacherDetails.module.scss';
import {Teacher} from "../../../../models/University/Teacher";

const TeacherItem: React.FC<{ item: Teacher }> = ({item}) => {

    return (
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
                    <td className={styles.firstColumn}>
                        Rank
                    </td>
                    <td>
                        {item.RANK}
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.firstColumn}>Email</td>
                    <td>{item.EMAIL}</td>
                </tr>

                {item.TOKEN &&
                    <tr className={styles.tableRow}>
                        <td className={styles.firstColumn}>Generated Token</td>
                        <td>{item.TOKEN}</td>
                    </tr>}
            </table>
        </li>
    )
}

export default TeacherItem;