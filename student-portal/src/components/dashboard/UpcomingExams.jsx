import React from 'react'
import ExamCard from '../UI/Cards/ExamCard'
import Modal from '../UI/Modal'
import styles from './UpcomingExams.module.css'

const data = [
    {
        subject: "DAA",
        examtype: "ISE - 1",
        syllabus: "Lorem ipsum dolor sit amet consectetur adipisicing."
    },
    {
        subject: "CCN",
        examtype: "MSE",
        syllabus: "Lorem ipsum dolor sit amet consectetur adipisicing."
    },
    {
        subject: "DBMS",
        examtype: "ISE - 2",
        syllabus: "Lorem ipsum dolor sit amet consectetur adipisicing."
    },
    {
        subject: "COA",
        examtype: "ISE - 2",
        syllabus: "Lorem ipsum dolor sit amet consectetur adipisicing."
    },
    {
        subject: "OS",
        examtype: "ISE - 3",
        syllabus: "Lorem ipsum dolor sit amet consectetur adipisicing."
    },
]
const UpcomingExams = () => {
    return (
        <div className={styles.wrapper}>
            {data.map((exam, index) => (
                <ExamCard key={index} exam={exam} />
            ))}
        </div>
    )
}

export default UpcomingExams