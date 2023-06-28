import React from 'react'
import { Link } from 'react-router-dom'
import SemesterCard from './SemesterCard'
import styles from './Result.module.css'

const semesters = [
    {
        semester: "1",
        year: "F.Y.B.Tech",
        status: "Completed",
        sgpa: "9.5",
    },
    {
        semester: "2",
        year: "F.Y.B.Tech",
        status: "Completed",
        sgpa: "9.5",
    },
    {
        semester: "3",
        year: "S.Y.B.Tech",
        status: "Completed",
        sgpa: "9.5",
    },
    {
        semester: "4",
        year: "S.Y.B.Tech",
        status: "Ongoing",
        sgpa: null,
    },
    {
        semester: "5",
        year: "T.Y.B.Tech",
        status: "Not Started",
        sgpa: null,
    },
    {
        semester: "6",
        year: "T.Y.B.Tech",
        status: "Not Started",
        sgpa: null,
    },
    {
        semester: "7",
        year: "B.Tech",
        status: "Not Started",
        sgpa: null,
    },
    {
        semester: "8",
        year: "B.Tech",
        status: "Not Started",
        sgpa: null,
    },
]

const Result = () => {
    const container = styles.container + " flex flex-col gap-8 p-8"
    return (
        <div className={container}>
            <h1 className="text-4xl font-semibold">Result Information</h1>
            <div className="flex flex-col gap-4">
                <div className={styles.semGrid}>
                    {semesters.map((semester, index) => (
                        <SemesterCard 
                            key={index} 
                            semester={semester.semester}
                            year={semester.year}
                            status={semester.status} 
                            sgpa={semester.sgpa} 
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Result