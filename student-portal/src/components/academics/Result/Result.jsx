import React from 'react'
import { Link } from 'react-router-dom'
import SemesterCard from './SemesterCard'
import styles from './Result.module.css'

const Result = () => {
    const container = styles.container + " flex flex-col gap-8 p-8"
    return (
        <div className={container}>
            <h1 className="text-4xl font-semibold">Result Information</h1>
            <div className="flex flex-col gap-4">
                <h1 className="text-xl p-1 font-semibold heading">F.Y.B.Tech</h1>
                <div>
                    <SemesterCard />
                    <SemesterCard />
                </div>
            </div>
        </div>
    )
}

export default Result