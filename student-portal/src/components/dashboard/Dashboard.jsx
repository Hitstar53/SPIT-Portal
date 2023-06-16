import React from 'react'
import AnnounceCard from '../UI/Cards/AnnounceCard'
import UpcomingExams from './UpcomingExams'
import EventCard from '../UI/Cards/EventCard'

const Dashboard = () => {
    return (
        <div className="dashboard flex flex-col gap-8 p-8 text-[var(--text-dark)]" style={{minHeight: "calc(100vh - 64px)"}}>
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