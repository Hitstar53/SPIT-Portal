import React from "react";
import styles from "./CommitteesCard.module.css";
import ComAdmin from "./ComAdmin.jsx";
import { useNavigate } from "react-router-dom";

const CommitteesCard = (props) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/student/committees/${props.comname}`);
  };

  return (
    <div
      className={styles.comCard}
      onClick={clickHandler}
      style={{ cursor: "pointer" }}
    >
      <h2 className={styles.comname}>{props.comname}</h2>
      <h3 className={styles.commen}>{props.commen}</h3>
    </div>
  );
};

export default CommitteesCard;
