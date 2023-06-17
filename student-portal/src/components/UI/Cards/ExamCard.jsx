import React, { useState } from 'react'
import Modal from '../Modal'
import styles from './ExamCard.module.css'

const ExamCard = (props) => {
    const title = "Syallabus for " + props.exam.subject + ", " + props.exam.examtype
    const content = props.exam.syllabus
    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <h1>{props.exam.subject}</h1>
                <h1>{props.exam.examtype}</h1>
            </div>
            <div className={styles.cardFooter}>
                <Modal buttonText="Syllabus" title={title} content={content} />
            </div>
        </div>
    )
}

export default ExamCard