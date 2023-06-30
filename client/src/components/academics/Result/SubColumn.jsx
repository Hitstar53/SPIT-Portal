import React from "react";
import styles from "./SubColumn.module.css";
import ResultCard from "./ResultCard.jsx";

const data = [
  {
    subject: "Design and Analysis of Algorithms",
    examtype: "ISE - 1",
    obtained: "15/20",
    date: "19/1/20",
  },
  {
    subject: "Computer Connection and Networking",
    examtype: "MSE",
    obtained: "15/20",
    date: "19/1/20",
  },
  {
    subject: "Computer Connection and Networking",
    examtype: "ISE - 2",
    obtained: "15/20",
    date: "19/1/20",
  },
  {
    subject: "Design and Analysis of Algorithms",
    examtype: "ISE - 2",
    obtained: "15/20",
    date: "19/1/20",
  }
];

const SubColumn = (props) => {
  return (
    <div>
      <h1 className={styles.subject}>{props.exam.subject}</h1>
      <div className={styles.wrapper}>
        {data.map((exam, index) => (
          <ResultCard key={index} exam={exam} />
        ))}
      </div>
      <hr className={styles.divider} />
    </div>
  );
};

export default SubColumn;
