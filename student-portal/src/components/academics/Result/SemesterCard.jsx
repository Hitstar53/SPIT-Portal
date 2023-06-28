import React from 'react'
import { NavLink } from 'react-router-dom'
import Chip from "@mui/material/Chip";
import styles from './SemesterCard.module.css'

const SemesterCard = (props) => {
  const classes = [styles.card]
  let backgroundColor = ""
  let color = ""

  if (props.status === "Completed") {
    backgroundColor = "var(--tertiary-color)"
    color = "var(--text-light)"
  } else if (props.status === "Ongoing") {
    backgroundColor = "var(--primary-color)"
    color = "var(--text-light)"
  } else if (props.status === "Not Started") {
    backgroundColor = "var(--secondary-color)"
    color = "var(--text-color)"
    classes.push(styles.disabled)
  }
  return (
    <NavLink
      to={`/student/result/${props.semester}`}
      className={classes.join(" ")}
      style={{
        backgroundColor: backgroundColor,
        color: color,
      }}
    >
      <div className={styles.title}>
        Semester {props.semester}
      </div>
      <div className={styles.status}>
        <Chip 
          label={props.year}
          sx={{
            backgroundColor: "var(--secondary-color)",
            color: "var(--text-color)",
            cursor: "pointer",
            "&:hover": {
              filter: "brightness(0.7)",
            }
          }}
        />
        {props.status}
      </div>
      {
        props.sgpa && (
          <div className={styles.sgpa}>
            SGPA: {props.sgpa}
          </div>
        )
      }
    </NavLink>
  )
}

export default SemesterCard