import React from "react";
import Announcement from "./Announcement";
import styles from "./AnnounceCard.module.css";
import logo from "../../../assets/user.svg";
import OtherAnnouncement from "./OtherAnnouncement";

const data = [
  {
    logo: logo,
    date: "23/6/2023",
    title: "Placement Drive 2023",
    by: "TPO, S.P.I.T",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc",
  },
  {
    logo: logo,
    date: "3/5/2023",
    title: "SE Hackathon dates",
    by: "CSI, S.P.I.T",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc",
  },
  {
    logo: logo,
    date: "15/3/2023",
    title: "General Championship 2023",
    by: "Student Council",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc",
  },
  {
    logo: logo,
    date: "25/4/2023",
    title: "E-Cell Encalve 2023",
    by: "E-Cell, S.P.I.T",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc",
  },
];

const OtherAnnounceCard = () => {
  return (
    <div 
        className={styles.card}
        style={{
            backgroundColor: "var(--secondary-color)",
            color: "var(--text-color)",
        }}
    >
      <div className={styles.inner}>
        {data.map((item, index) => (
          <OtherAnnouncement key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default OtherAnnounceCard;
