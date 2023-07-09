import React from 'react'
import ExamCard from '../UI/Cards/ExamCard'
import styles from './UpcomingExams.module.css'

const data = [
    {
        subject: "DAA",
        date: "11/11/2022",
        examtype: "ISE - 1",
        syllabus: "Lorem ipsum dolor sit"
    },
    {
        subject: "CCN",
        date: "10/20/2022",
        examtype: "MSE",
        syllabus: "Lorem ipsum dolor sit amet consectetur adipisicing."
    },
    {
        subject: "DBMS",
        date: "6/27/2023",
        examtype: "ISE - 2",
        syllabus: "Lorem ipsum dolor sit amet consectetur adipisicing."
    },
    {
        subject: "COA",
        date: "1/7/2022",
        examtype: "ISE - 2",
        syllabus: "Lorem ipsum dolor sit amet consectetur adipisicing."
    },
    {
        subject: "OS",
        date: "11/12/2023",
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