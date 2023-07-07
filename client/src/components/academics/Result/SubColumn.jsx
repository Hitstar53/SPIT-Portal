import React from "react";
import styles from "./SubColumn.module.css";
import ResultCard from "./ResultCard.jsx";

const SubColumn = (props) => {
  return (
    <div>
      <h1 className={styles.subject}>{props.course.courseName}</h1>
      <div className={styles.wrapper}>
        {props.course.exams.map((exam, index) => (
          <ResultCard key={index} exam={exam} />
        ))}
      </div>
      <hr className={styles.divider} />
    </div>
  );
};

export default SubColumn;
