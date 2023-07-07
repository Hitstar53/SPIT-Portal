import React, { useRef, useEffect } from "react";
import styles from "./ResultCard.module.css";

const ResultCard = (props) => {
  return (
    <div className={styles.card}>
      <span className={styles.examType}>{props.exam.type}</span>
      <div className={styles.cardContent}>
        <h2>
          <div>OBTAINED:</div>
          {props.exam.obtainedScore} / {props.exam.maxScore}
        </h2>
        <h3>
          <span>DATE: </span>
          {props.exam.date}
        </h3>
        {/* <h3>{props.exam.examtype}</h3> */}
      </div>
    </div>
  );
};

export default ResultCard;
