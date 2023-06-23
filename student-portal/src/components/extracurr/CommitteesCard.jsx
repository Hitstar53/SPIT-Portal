import React from 'react';
import styles from './CommitteesCard.module.css';

const CommitteesCard = (props) => {
  return (
    <div className={styles.comCard}>
        <h2 className={styles.comname}>{props.comname}</h2>
        <h3 className={styles.commen}>{props.commen}</h3>
    </div>
  )
}

export default CommitteesCard