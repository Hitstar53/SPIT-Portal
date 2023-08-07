import React from 'react'
import { json, useLoaderData } from 'react-router-dom'
import SemesterCard from './SemesterCard'
import ServerUrl from '../../../constants'
import styles from './Result.module.css'

const semesters = [
    {
        semesterNumber: "1",
        year: "F.Y.B.Tech",
        status: "Completed",
        sgpa: "9.5",
    },
    {
        semesterNumber: "2",
        year: "F.Y.B.Tech",
        status: "Completed",
        sgpa: "9.5",
    },
    {
        semesterNumber: "3",
        year: "S.Y.B.Tech",
        status: "Completed",
        sgpa: "9.5",
    },
    {
        semesterNumber: "4",
        year: "S.Y.B.Tech",
        status: "Ongoing",
        sgpa: null,
    },
    {
        semesterNumber: "5",
        year: "T.Y.B.Tech",
        status: "Not Started",
        sgpa: null,
    },
    {
        semesterNumber: "6",
        year: "T.Y.B.Tech",
        status: "Not Started",
        sgpa: null,
    },
    {
        semesterNumber: "7",
        year: "B.Tech",
        status: "Not Started",
        sgpa: null,
    },
    {
        semesterNumber: "8",
        year: "B.Tech",
        status: "Not Started",
        sgpa: null,
    },
]

const Result = () => {
    const container = styles.container + " flex flex-col gap-8 p-8"
    const data = useLoaderData()
    return (
        <div className={container}>
            <h1 className="text-4xl font-semibold">Result Information</h1>
            <div className="flex flex-col gap-4">
                <div className={styles.semGrid}>
                    {data.semester.map((semester, index) => (
                        <SemesterCard 
                            key={index} 
                            semesterNumber={semester.semesterNumber}
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

export async function loader() {
    const response = await fetch(
      `${ServerUrl}/api/student/getSemesters`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: JSON.parse(localStorage.getItem("userinfo")).email,
        }),
      }
    );
    if(!response.ok) {
        return json(
          { message: "Could not fetch Semester information" },
          { status: 422 }
        );
    } else {
        const semData = await response.json()
        return semData;
    }
}