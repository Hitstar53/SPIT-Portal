import React from 'react'
import styles from './ExamCard.module.css'

const ExamCard = () => {
    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <h1>PSOOP</h1>
                <h1>ISE - 1</h1>
            </div>
        </div>
    )
}

export default ExamCard