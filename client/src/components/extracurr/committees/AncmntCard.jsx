import React from "react";
import styles from "./AncmntCard.module.css";
import { useLoaderData } from "react-router-dom";
import ServerUrl from "../../../constants";
import dayjs from 'dayjs';

const AncmntCard = (props) => {
  const data = useLoaderData();
  return (
    <div className={styles.ancmntCard}>
      <div className={styles.content}>
        <h2 className={styles.title}>{props.title}</h2>
        <h3 className={styles.date}>
          {dayjs(props.date).format("DD/MM/YYYY")}
        </h3>
        <div className={styles.paragraph}>{props.ancmnt}</div>
      </div>
    </div>
  );
};

export default AncmntCard;
