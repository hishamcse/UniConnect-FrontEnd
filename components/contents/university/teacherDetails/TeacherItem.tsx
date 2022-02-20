import React from "react";
import styles from './TeacherDetails.module.scss';

const TeacherItem: React.FC<{ item: TeacherItem }> = ({item}) => {

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

                {item.GENERATED_PASS &&
                    <tr className={styles.tableRow}>
                        <td className={styles.firstColumn}>Generated Password</td>
                        <td>{item.GENERATED_PASS}</td>
                    </tr>}
            </table>
        </li>
    )
}

export default TeacherItem;