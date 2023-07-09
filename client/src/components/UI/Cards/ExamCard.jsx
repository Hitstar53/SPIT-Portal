import React, { useState } from 'react'
import Modal from '../Modals/Modal'
import Button from '@mui/material/Button'
import dayjs from 'dayjs'
import styles from './ExamCard.module.css'

const ExamCard = (props) => {
    const title = "Syllabus for " + props.exam.subject + ", " + props.exam.examtype
    const content = props.exam.syllabus
    const day = dayjs(props.exam.date).format("DD") + "TH"
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
          <h1>{props.exam.subject}</h1>
          <h1>{props.exam.examtype}</h1>
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