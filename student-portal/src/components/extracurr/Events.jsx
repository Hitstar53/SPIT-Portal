import React from "react";
import styles from "./Events.module.css";
import EventsCard from "./EventsCard.jsx"

const eventinfo = [
  {
    eventname : "Business Case Study Competition",
    eventdate : "12/12/38",
    orgname : "S.P. Jain Institute of Management and Research",
    eventinfo: "A business case study competition is an exciting platform where aspiring entrepreneurs and business professionals can showcase their analytical and problem-solving skills by presenting solutions to real-world business challenges."
  },
  {
    eventname : "TechFest",
    eventdate : "12/12/38",
    orgname : "Indian Institute of Technology, Bombay",
    eventinfo: "Techfest by IITB is an exhilarating annual techno-management festival organized by the Indian Institute of Technology Bombay, showcasing cutting-edge technological advancements and innovations. This is the largest technical fest in Asia."
  },
  {
    eventname : "Hackathon",
    eventdate : "12/12/38",
    orgname : "Michigan State University",
    eventinfo: "The hackathon at Michigan State University brings together students from diverse disciplines, fostering a collaborative environment for innovation and creativity in solving real-world challenges through technology."
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
                orgname={event.orgname}
                eventinfo={event.eventinfo}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default Events;