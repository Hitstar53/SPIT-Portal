import React from "react";
import styles from "./ParentalInfo.module.css";

const ParentalInfo = (props) => {
  return (
    <div>
      <h3 className = {styles.header}>
        Parental Information
      </h3>
      <div className = {styles.PartInfo}>
        <div className = {styles.twoCol}>
          <i class="fa-solid fa-user"></i>
          <span className = {styles.iconInfo}>{props.info.fname}</span>
        </div>
        <div className = {styles.twoCol}>
          <i class="fa-solid fa-user"></i>
          <span className = {styles.iconInfo}>{props.info.mname}</span>
        </div>
      </div>
      <div className = {styles.PartInfo}>
        <div className = {styles.twoCol}>
          <i class="fas fa-phone"></i>
          <span className = {styles.iconInfo}>+91 {props.info.fphone}</span>
        </div>
        <div className = {styles.twoCol}>
          <i class="fas fa-phone"></i>
          <span className = {styles.iconInfo}>+91 {props.info.mphone}</span>
        </div>
      </div>
      <div className = {styles.PartInfo}>
        <div className = {styles.twoCol}>
          <i class="fa-solid fa-envelope"></i>
          <span className = {styles.iconInfo}>{props.info.femail}</span>
        </div>
        <div className = {styles.twoCol}>
          <i class="fa-solid fa-envelope"></i>
          <span className = {styles.iconInfo}>{props.info.memail}</span>
        </div>
      </div>
    </div>
  );
};

export default ParentalInfo;
