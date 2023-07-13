import React, { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import styles from "./AddEvent.module.css";
import dayjs from 'dayjs';

const AddEvent = (props) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.card} onClick={() => setIsActive(!isActive)}>
      <div className={styles.event}>
        <div className={styles.eventTitle}>
          <div className={styles.name}>{props.name}</div>
          <div className={styles.date}>{dayjs(props.endDate).format("DD/MM/YYYY")}</div>
        </div>
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
