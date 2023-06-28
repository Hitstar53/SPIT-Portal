import React from 'react'
import styles from './AttendCard.module.css'

const attendance = [
    {
        date: "01/01/2021",
        
    },
]

const AttendCard = () => {
  return (
    <div className={styles.card}>
        <div className={styles.inner}>
            Attendance here
        </div>
    </div>
  )
}

export default AttendCard