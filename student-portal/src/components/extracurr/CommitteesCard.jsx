import React from 'react';
import styles from './CommitteesCard.module.css';
import ComAdmin from './ComAdmin.jsx';

const comAdmin = (props) =>{
  <ComAdmin comname={props.props.name} />
}


const CommitteesCard = (props) => {

  return (
    <div className={styles.comCard} onClick={() => comAdmin(props.name)} style={{cursor: "pointer"}}>
        <h2 className={styles.comname}>{props.comname}</h2>
        <h3 className={styles.commen}>{props.commen}</h3>
    </div>
  )
}

export default CommitteesCard