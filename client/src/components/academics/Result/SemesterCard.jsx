import React from 'react'
import { NavLink } from 'react-router-dom'
import Chip from "@mui/material/Chip";
import styles from './SemesterCard.module.css'

const SemesterCard = (props) => {
  const classes = [styles.card]
  let backgroundColor = ""
  let color = ""

  let year = ""
  let semesterYear = 0
  if (props.semesterNumber === 1 || props.semesterNumber === 2) {
    year = "F.Y.B.Tech"
    semesterYear = `${props.admissionYear}-${props.admissionYear%100+1}`
  } else if (props.semesterNumber === 3 || props.semesterNumber === 4) {
    year = "S.Y.B.Tech"
    semesterYear = `${parseInt(props.admissionYear)+1}-${props.admissionYear%100+2}`
  } else if (props.semesterNumber === 5 || props.semesterNumber === 6) {
    year = "T.Y.B.Tech"
    semesterYear = `${parseInt(props.admissionYear)+2}-${props.admissionYear%100+3}`
  } else if (props.semesterNumber === 7 || props.semesterNumber === 8) {
    year = "B.Tech"
    semesterYear = `${parseInt(props.admissionYear)+3}-${props.admissionYear%100+4}`
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
            label={semesterYear}
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