import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./CommitteeWorkCard.module.css";
import logo from "../../../assets/user.svg";

const CommitteeWorkCard = (props) => {
  return (
    <div className={styles.comCard}>
      <div className={styles.inner}>
        <img src={logo} alt="committee logo" className={styles.comLogo} />
        <div className={styles.content}>
          <div className={styles.title}>
            <h2 className={styles.comname}>{props.comname}</h2>
            <DeleteIcon
              sx={{ color: "var(--text-light)", cursor: "pointer" }}
              onClick={() => {
                props.handleDelete(props.key);
              }}
            />
          </div>
          <div className={styles.position}>
            {props.compos}, {props.comyear}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitteeWorkCard;
