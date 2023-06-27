import React from "react";
import styles from "./ComAdmin.module.css";
import AddButton from "../../UI/AddButton.jsx";
import AncmntCard from "./AncmntCard.jsx";
import Members from "./Members.jsx";
import AddEvent from "../events/AddEvent.jsx";

const announcement = [
  {
    date: "24/10/23",
    ancmnt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
];

function createCard(announcement) {
  return <AncmntCard date={announcement.date} ancmnt={announcement.ancmnt} />;
}

const event = [
  {
    date: "24/10/23",
    name: "Pixel Perfect",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

function createEvent(event) {
  return <AddEvent date={event.date} name={event.name} description={event.description} />;
}

const members = [
  {
    name: "Aditya Kharote",
    pos: "Chairperson",
  },
  {
    name: "Siddhant Mesharam",
    pos: "Vice Chairperson",
  },
  {
    name: "Prathmesh Sharma",
    pos: "Vice Chairperson",
  },
];

function createMember(members) {
  return <Members name={members.name} pos={members.pos} />;
}

const btntext = "ADD";

const ComAdmin = (props) => {
  return (
    <div className={styles.comAdminPage}>
      <h1 className={styles.heading}>
        {props.props.props.comname}
      </h1>
      <div className={styles.header}>
        <h2 className={styles.subheading}>Announcements</h2>
        <AddButton btntext="ADD" />
      </div>
      {announcement.map(createCard)}
      <hr className={styles.divider} />
      <div className={styles.header}>
        <h2 className={styles.subheading}>Events</h2>
        <AddButton btntext="ADD" />
      </div>
      <div className={styles.addEvent}>
        <input className={styles.takeInput} placeholder="Set Date" />
        <input className={styles.takeInput} placeholder="Event Name" />
        <input className={styles.takeInput} placeholder="Add Description" />
      </div>
      {event.map(createEvent)}
      <hr className={styles.divider} />
      <h2 className={styles.subheading}>Members</h2>
      <div className={styles.tableHeader}>
        <h3>Name</h3>
        <h3>Position</h3>
      </div>
      <hr className={styles.divider} />
      {members.map(createMember)}
    </div>
  );
};

export default ComAdmin;
