import React from "react";
import styles from "./Members.module.css";

const Members = () => {
  return (
    <div>
      <div className={styles.header}>
        <h3>Name</h3>
        <h3>Position</h3>
      </div>
      <hr className={styles.divider}/>
    </div>
  );
};

export default Members;
