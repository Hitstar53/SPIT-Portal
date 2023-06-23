import React from "react";
import styles from "./Events.module.css";


const eventinfo = [
  {
    eventname : "TechFest",
    eventdate : "12/12/38",
  },
  {
    eventname : "TechFest",
    eventdate : "12/12/38",
  },
  {
    eventname : "TechFest",
    eventdate : "12/12/38",
  },
]

function eventCard(eventinfo) {
  return (
    <Events
      eventname = {eventinfo.eventname}
      eventdate = {eventinfo.eventdate}
    />
  );
}

const Events = (props) => {
  return (
    <div className={styles.eventsCard}>
      <div className={styles.content}>
        <div className={styles.position}>
          <h2 className={styles.eventname}>{props.eventname}</h2>
          <h2 className={styles.eventname}>{props.eventdate}</h2>
        </div>
      </div>
    </div>
  );
};

export default Events;