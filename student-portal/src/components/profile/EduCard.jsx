import React from "react";
import styles from "./EduInfo.module.css";

const EduCard = (props) => {
  return (
    <div className="card">
      <div>
        <h3 className={styles.header}>{props.info.edulevel}</h3>
        <div className={styles.row}>
          <div className={styles.twoCol}>
            <label className={styles.label}>Institute:</label>
            <p>{props.info.inst}</p>
          </div>
          <div className={styles.twoCol}>
            <label>Degree:</label>
            <p>{props.info.degree}</p>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.threeCol}>
            <label>Branch:</label>
            <p>{props.info.branch}</p>
          </div>
          <div className={styles.threeCol}>
            <label>Division:</label>
            <p>{props.info.div}</p>
          </div>
          <div className={styles.threeCol}>
            <label>Semester:</label>
            <p>{props.info.sem}</p>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.threeCol}>
            <label>Admission Year:</label>
            <p>{props.info.admyear}</p>
          </div>
          <div className={styles.threeCol}>
            <label>Passing Year:</label>
            <p>{props.info.passyear}</p>
          </div>
          <div className={styles.threeCol}>
            <label>CGPA:</label>
            <p>{props.info.cgpa}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EduCard;