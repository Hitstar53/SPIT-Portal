import React from "react";
import styles from "./VolunteerWork.module.css";



const VolunteerWork = (props) => {
    return (
      <div className={styles.volCard}>
        <div className={styles.content}>
          <div className={styles.position}>
            <h2 className={styles.volname}>{props.info.volname}</h2>
            <h2 className={styles.volname}>{props.info.voldur}</h2>
          </div>
          <div className={styles.position}>
            <div className={styles.instructor}>{props.info.instructor}</div>
          </div>
          <div>{props.info.desc}</div>
        </div>
      </div>
    );
  };

export default VolunteerWork;
