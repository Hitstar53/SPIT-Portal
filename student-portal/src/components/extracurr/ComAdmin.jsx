import React from "react";
import styles from "./ComAdmin.module.css";
import AddButton from "../UI/AddButton.jsx";
import AncmntCard from "./AncmntCard.jsx";
import Members from "./Members.jsx";

const announcement = [
    {
        date: "24/10/23",
        ancmnt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
]

function createCard(announcement) {
    return (
      <AncmntCard
        date={announcement.date}
        ancmnt={announcement.ancmnt}
      />
    );
  }

const ComAdmin = (props) => {
  return (
    <div className={styles.comAdminPage}>
      <h1 className={styles.heading}>
        Computer Society of India (C.S.I. S.P.I.T.)
      </h1>
      <div className={styles.header}>
        <h2 className={styles.subheading}>Announcements</h2>
        <div>
          <AddButton />
        </div>
      </div>
      <div>{announcement.map(createCard)}</div>
      <hr className={styles.divider} />
      <h2 className={styles.subheading}>Members</h2>
      <Members />
    </div>
  );
};

export default ComAdmin;
