import React, { useState } from "react";
import styles from "./AddEvent.module.css";

const AddEvent = (props) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.event}>
        <span>{props.date}</span>
        <span>{props.name}</span>
        <span onClick={() => setIsActive(!isActive)} style={{cursor: "pointer"}}>+</span>
      </div>
      {isActive && (
        <div>
          <hr className={styles.divider} />
          <div>{props.description}</div>
        </div>
      )}
    </div>
  );
};

export default AddEvent;
