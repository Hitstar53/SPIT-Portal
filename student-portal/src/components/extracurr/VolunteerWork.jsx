import React from "react";
import styles from "./VolunteerWork.module.css";

const VolunteerWork = (props) => {
    return (
      <div className={styles.volCard}>
        <div className={styles.content}>
          <div className={styles.position}>
            <h2 className={styles.volname}>{props.volname}</h2>
            <h2 className={styles.volname}>{props.voldur}</h2>
          </div>
          <div className={styles.position}>
            <div className={styles.instructor}>{props.instructor}</div>
          </div>
          <div className={styles.description}>{props.desc}</div>
        </div>
      </div>
    );
  };

export default VolunteerWork;
