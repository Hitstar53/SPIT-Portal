import React, { useState } from "react";
import styles from "./AddEvent.module.css";

const AddEvent = (props) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.event}>
        <span className={styles.eventTitle}>
          <span className={styles.name}>
            {props.name}
          </span>, {props.date}
        </span>
        <span
          className={styles.icon}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? "-" : "+"}
        </span>
      </div>
      {isActive && (
        <div>
          <hr className={styles.accordDivider} />
          <p className={styles.description}>
            {props.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddEvent;
