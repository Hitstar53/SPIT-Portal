import React from 'react'
import ExamCard from '../UI/Cards/ExamCard'
import styles from './UpcomingExams.module.css'

const UpcomingExams = () => {
    return (
        <div className={styles.wrapper}>
            <ExamCard />
            <ExamCard />
            <ExamCard />
            <ExamCard />
        </div>
    )
}

export default UpcomingExams