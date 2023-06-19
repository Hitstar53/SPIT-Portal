import React, { useState } from 'react'
import Modal from '../Modal'
import Button from '@mui/material/Button'
import styles from './ExamCard.module.css'

const ExamCard = (props) => {
    const title = "Syllabus for " + props.exam.subject + ", " + props.exam.examtype
    const content = props.exam.syllabus

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
      <div className={styles.card}>
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
                backgroundColor: "var(--secondary-color)",
                color: "var(--text-dark)",
                border: "2px solid var(--primary-color)",
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
                onClose={handleClose}
            />
          )}
        </div>
      </div>
    );
}

export default ExamCard