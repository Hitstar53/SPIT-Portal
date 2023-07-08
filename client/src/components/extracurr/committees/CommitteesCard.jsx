import React from "react";
import styles from "./CommitteesCard.module.css";
import ComAdmin from "./ComAdmin.jsx";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

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
      <div className={styles.content}>
        <h2 className={styles.name}>{props.comname}</h2>
        <h3 className={styles.mentor}>Mentored by: {props.commen}</h3>
      </div>
      <Avatar
        sx={{ width: 65, height: 65 }}
        alt="logo"
      />
    </div>
  );
};

export default CommitteesCard;
