import React, { useState } from "react";
import styles from "./Card.module.css";
import dayjs from "dayjs";

const AncmntExamCard = (props) => {
  return (
    <React.Fragment>
      {props.length !== 0 ? (
        <div className={styles.ancmntCard} >
          <div className={styles.content}>
            <div className={styles.title}>
              <h2>{props.title}</h2>
              <h3>{dayjs(props.date).format('DD-MM-YYYY')}</h3>
            </div>
            <div className={styles.sub}>
              <h4>Exam Type: {props.type}</h4>
              <h4>Sent to: {props.sendTo}</h4>
            </div>
            <div className={styles.paragraph}>Syllabus: {props.ancmnt}</div>
          </div>
        </div>
      ) : (
        <div className={styles.ancmntCard}>
          <p>No Exams Scheduled</p>
        </div>
      )}
    </React.Fragment>
  );
};

export default AncmntExamCard;
