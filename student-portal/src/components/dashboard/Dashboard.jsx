import React from 'react'
import UpcomingExams from './UpcomingExams'
import AnnounceCard from '../UI/Cards/AnnounceCard'
import EventCard from '../UI/Cards/EventCard'
import styles from './Dashboard.module.css'

const Dashboard = () => {
    const dashboard = styles.dashboard + " flex flex-col gap-8 p-8 text-[var(--text-dark)]"
    return (
        <div className={dashboard}>
            <h1 className="text-4xl font-semibold">Dashboard</h1>
            <div className="flex flex-col gap-4">
                <h1 className="text-xl p-1 font-semibold">Announcements</h1>
                <AnnounceCard />
            </div>
            <div className="flex flex-col gap-6">
                <h1 className="text-xl p-1 font-semibold">Upcoming Exams</h1>
                <UpcomingExams />
            </div>
            <div className="flex flex-col gap-6">
                <h1 className="text-xl p-1 font-semibold">Upcoming Events</h1>
                <EventCard />
            </div>
        </div>
    )
}

export default Dashboard