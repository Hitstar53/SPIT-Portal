import React, { useState } from 'react'
import Modal from '../Modals/Modal'
import Button from '@mui/material/Button'
import dayjs from 'dayjs'
import styles from './ExamCard.module.css'

const ExamCard = (props) => {
    const title = "Syllabus for " + props.exam.courseName + ", " + props.exam.type
    const content = props.exam.syllabus
    let day = dayjs(props.exam.date).format("DD")
    if (day[0] === "0") day = day.substring(1)
    if (day.substring(day.length - 1) === "1") day = day + "st"
    else if (day.substring(day.length - 1) === "2") day = day + "nd"
    else if (day === "13") day = day + "th"
    else if (day.substring(day.length - 1) === "3") day = day + "rd"
    else day = day + "th"
    const month = dayjs(props.exam.date).format("MMMM").substring(0, 3)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
      <div className={styles.card}>
        <span className={styles.date}>
          {day}
          <br />
          {month}
        </span>
        <div className={styles.cardContent}>
          <h1>{props.exam.courseName}</h1>
          <h1>{props.exam.type}</h1>
        </div>
        <div className={styles.cardFooter}>
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            sx={{
              backgroundColor: "var(--tertiary-color)",
              color: "var(--text-light)",
              borderRadius: "1rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "var(--tertiary-color)",
                boxShadow: "0px 0px 10px 0px var(--tertiary-color)"
              },
            }}
          >
            Syllabus
          </Button>
          {open && (
            <Modal 
                open={open}
                title={title} 
                content={content}
                action="Close"
                onClose={handleClose}
            />
          )}
        </div>
      </div>
    );
}

export default ExamCard