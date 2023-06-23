import React from "react";
import styles from "./Events.module.css";
import EventsCard from "./EventsCard.jsx"

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

const Events = () => {
  return (
    <div className={styles.eventsPage}>
      <h1 className={styles.heading}>Your Participation</h1>
      <div className={styles.comGrid}>
        {
          eventinfo.map((event,index) => {
            return (
              <EventsCard
                key={index}
                eventname={event.eventname}
                eventdate={event.eventdate}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default Events;