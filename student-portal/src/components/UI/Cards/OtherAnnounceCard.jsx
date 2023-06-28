import React from "react";
import Announcement from "./Announcement";
import styles from "./AnnounceCard.module.css";
import logo from "../../../assets/user.svg";
import OtherAnnouncement from "./OtherAnnouncement";

const data = [
  {
    logo: logo,
    title: "CSI, S.P.I.T",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc",
  },
  {
    logo: logo,
    title: "Student Council",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc",
  },
  {
    logo: logo,
    title: "TPO, S.P.I.T",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquet nunc, vitae aliquam nisl nunc",
  },
  {
    logo: logo,
    title: "E-Cell, S.P.I.T",
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
