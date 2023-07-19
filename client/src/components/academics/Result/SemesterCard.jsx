import React from 'react'
import { NavLink } from 'react-router-dom'
import Chip from "@mui/material/Chip";
import styles from './SemesterCard.module.css'

const SemesterCard = (props) => {
  const classes = [styles.card]
  let backgroundColor = ""
  let color = ""

  let year = ""
  if (props.semesterNumber === 1 || props.semesterNumber === 2) {
    year = "F.Y.B.Tech"
  } else if (props.semesterNumber === 3 || props.semesterNumber === 4) {
    year = "S.Y.B.Tech"
  } else if (props.semesterNumber === 5 || props.semesterNumber === 6) {
    year = "T.Y.B.Tech"
  } else if (props.semesterNumber === 7 || props.semesterNumber === 8) {
    year = "B.Tech"
  }

  if (props.status === "Completed") {
    backgroundColor = "var(--tertiary-color)"
    color = "var(--text-light)"
  } else if (props.status === "Ongoing") {
    backgroundColor = "var(--primary-color)"
    color = "var(--text-light)"
    classes.push(styles.ongoing)
  } else if (props.status === "Not Started") {
    backgroundColor = "var(--secondary-color)"
    color = "var(--text-color)"
    classes.push(styles.disabled)
  }
  return (
    <NavLink
      to={`/student/result/${props.semesterNumber}`}
      className={classes.join(" ")}
      style={{
        backgroundColor: backgroundColor,
        color: color,
      }}
    >
      <div className={styles.title}>Semester {props.semesterNumber}</div>
      <div className={styles.status}>
        <div className='flex gap-5'>
          <Chip
            label={year}
            sx={{
              fontSize: "0.8rem",
              backgroundColor: "var(--secondary-color)",
              color: "var(--text-color)",
              cursor: "pointer",
              "&:hover": {
                filter: "brightness(0.7)",
              },
            }}
          />
          <Chip
            label="2022-23"
            sx={{
              fontSize: "0.8rem",
              backgroundColor: "var(--secondary-color)",
              color: "var(--text-color)",
              cursor: "pointer",
              "&:hover": {
                filter: "brightness(0.7)",
              },
            }}
          />
        </div>
        {props.status}
      </div>
      {props.status === "Completed" && (
        <div className={styles.sgpa}>SGPA: {props.sgpa}</div>
      )}
    </NavLink>
  );
}

export default SemesterCard