import React from "react";
import styles from "./CommitteeWorkCard.module.css";

const CommitteeWorkCard = (props) => {
  return (
    <div className={styles.comCard}>
      <img
        src={props.comlogo}
        alt="committee logo"
        className={styles.comLogo}
      />
      <div className={styles.content}>
        <h2 className={styles.comname}>{props.comname}</h2>
        <div className={styles.position}>
          <div>{props.compos}</div>
          <div>{props.comyear}</div>
        </div>
      </div>
    </div>
  );
};

export default CommitteeWorkCard;
