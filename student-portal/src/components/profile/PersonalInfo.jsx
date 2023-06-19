import React from "react";
import styles from "./PersonalInfo.module.css";

const PersonalInfo = (props) => {
  return (
    <div className={styles.personalInfo}>
      <h3 className={styles.header}>Personal Information</h3>
      <div className={styles.PersInfo}>
        <div className={styles.twoCol}>
          <i class="fas fa-phone"></i>
          <span className={styles.iconInfo}>+91 {props.info.phone}</span>
        </div>
        <div className={styles.twoCol}>
          <i class="fa-solid fa-envelope"></i>
          <span className={styles.iconInfo}>{props.info.email}</span>
        </div>
      </div>
      <div style={{ width: "100%", marginBottom: "40px", display: "flex", flexDirection: "row", gap: "0.625rem", alignItems: "center"}} className={styles.PersInfo}>
        <i class="fa-solid fa-location-dot"></i>
        <span className={styles.iconInfo}>{props.info.address}</span>
      </div>
      <div className={styles.PersInfo}>
      <div className={styles.twoCol}><i class="fa-solid fa-calendar-days"></i><span className={styles.iconInfo}>{props.info.dob}</span></div>
      <div className={styles.twoCol}><i class="fa-solid fa-venus-mars"></i><span className={styles.iconInfo}>{props.info.gender}</span></div>
    </div>
    <div className={styles.PersInfo}>
      <div className={styles.twoCol}><i class="fa-solid fa-droplet"></i><span className={styles.iconInfo}>{props.info.blood}</span> </div>
      <div className={styles.twoCol}><i class="fa-solid fa-hands-praying"></i><span className={styles.iconInfo}>{props.info.religion}</span></div>
    </div>
    <div className={styles.PersInfo}>
      <div className={styles.twoCol}><i class="fa-brands fa-linkedin"></i><span className={styles.iconInfo}>{props.info.linkedin}</span> </div>
      <div className={styles.twoCol}><i class="fa-brands fa-github"></i><span >{props.info.github}</span></div>
    </div>
    </div>
  );
};

export default PersonalInfo;
