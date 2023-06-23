import React from "react";
import styles from "./Events.module.css";

const Events = (props) => {
  return (
    <div className={styles.eventsCard}>
      <div className={styles.content}>
        <div className={styles.position}>
          <h2 className={styles.eventname}>{props.eventname}</h2>
          <h2 className={styles.eventname}>{props.eventdate}</h2>
          <hr className={styles.horizontalLine} />
        </div>
      </div>
    </div>
  );
};

export default Events;