import React from "react";
import styles from "./EventsCard.module.css";

const Events = (props) => {
  return (
    <div className={styles.eventsCard}>
      <div className={styles.content}>
        <div className={styles.position}>
          <div className={styles.eventname}>{props.eventname}</div>
          <div className={styles.eventname}>{props.eventdate}</div>
        </div>
        <div className={styles.position}>
          <hr className={styles.horizontalLine} />
        </div>
        <div className={styles.position}>
          <div className={styles.organisation_name}>{props.orgname}</div>
        </div>
        <div className={styles.position}>
          <div className={styles.descr}>{props.eventinfo}</div>
        </div>
      </div>
    </div>
  );
};

export default Events;