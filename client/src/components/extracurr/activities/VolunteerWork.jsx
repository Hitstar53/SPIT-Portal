import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./VolunteerWork.module.css";

const VolunteerWork = (props) => {
    return (
      <div className={styles.volCard}>
        <div className={styles.content}>
          <div className={styles.position}>
            <h2 className={styles.volname}>
              {props.volname}
            </h2>
            <div className={styles.dur}>
              <h2 className={styles.volname}>
                {props.voldur}
              </h2>
              <DeleteIcon
                sx={{ 
                  color: "var(--text-color)",
                  marginTop: "0.1rem",
                  width: "1.55rem",
                  height: "1.55rem",
                  cursor: "pointer" 
                }}
                onClick={() => {
                  handleClickOpen(index);
                }}
              />
            </div>
          </div>
          <div className={styles.position}>
            <div className={styles.instructor}>{props.instructor}</div>
          </div>
          <div className={styles.description}>{props.desc}</div>
        </div>
      </div>
    );
  };

export default VolunteerWork;
