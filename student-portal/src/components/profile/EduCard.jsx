import React from "react";
import styles from "./EduCard.module.css";
import { useState } from "react";

const EduCard = (props) => {
  const key = props.index;
  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.header}>{props.info.edulevel}</h3>
        <div className={styles.row}>
          <div className={styles.twoCol}>
            <label className={styles.label}>Institute:</label>
            <p>{props.info.inst}</p>
          </div>
          {key === 0 && (
            <div className={styles.twoCol}>
              <label>Degree:</label>
              <p>{props.info.degree}</p>
            </div>
          )}
          {(key === 1 || key === 2) && (
            <div className={styles.twoCol}>
              <label>Qualification:</label>
              <p>{props.info.qualification}</p>
            </div>
          )}
        </div>
        {key === 0 && (
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
        )}
        <div className={styles.row}>
          {key === 0 && (
            <div className={styles.threeCol}>
              <label>Admission Year:</label>
              <p>{props.info.admyear}</p>
            </div>
          )}
          <div className={styles.threeCol}>
            <label>Passing Year:</label>
            <p>{props.info.passyear}</p>
          </div>
          {key === 0 && (
            <div className={styles.threeCol}>
              <label>CGPA:</label>
              <p>{props.info.cgpa}</p>
            </div>
          )}
          {(key === 1 || key === 2) && (
            <div className={styles.threeCol}>
              <label>Score:</label>
              <p>{props.info.score}</p>
            </div>
          )}
          {(key === 1 || key === 2) && (
            <div className={styles.threeCol}>
              <label>Percentage:</label>
              <p>{props.info.percentage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EduCard;
