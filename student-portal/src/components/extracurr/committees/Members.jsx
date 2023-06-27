import React from "react";
import styles from "./Members.module.css";

const Members = (props) => {
  return (
    <div>
      <div className={styles.cols}>
        <div>{props.name}</div>
        <div>{props.pos}</div>
      </div>
    </div>
  );
};

export default Members;
