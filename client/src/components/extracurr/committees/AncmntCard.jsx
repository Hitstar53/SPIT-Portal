import React from "react";
import styles from "./AncmntCard.module.css";
import dayjs from 'dayjs';

const AncmntCard = (props) => {
  return (
    <div className={styles.ancmntCard}>
      <div className={styles.content}>
        <h2 className={styles.title}>{props.data.title}</h2>
        <h3 className={styles.date}>
          {dayjs(props.data.date).format("DD/MM/YYYY")}
        </h3>
        <div className={styles.paragraph}>{props.data.ancmnt}</div>
      </div>
    </div>
  );
};

export default AncmntCard;
