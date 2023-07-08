import React, { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import styles from "./AddEvent.module.css";

const AddEvent = (props) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.card} onClick={() => setIsActive(!isActive)}>
      <div className={styles.event}>
        <span className={styles.eventTitle}>
          <span className={styles.name}>{props.name}</span>, {props.date}
        </span>
        <span className={styles.icon}>
          {isActive ? <ExpandLess /> : <ExpandMore />}
        </span>
      </div>
      {isActive && (
        <div>
          <hr className={styles.accordDivider} />
          <p className={styles.description}>{props.description}</p>
        </div>
      )}
    </div>
  );
};

export default AddEvent;
