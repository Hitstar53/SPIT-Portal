import React from "react";
import styles from "./CommitteeCard.css";

const CommitteeCard = () => {
  return (
    <div className={styles.comCard}>
      <img />
      <h2>Computer Society of India (C.S.I.)</h2>
      <div className={styles.position}>
        <div>Technical Head</div>
        <div>2022-23</div>
      </div>
    </div>
  );
};

export default CommitteeCard;
