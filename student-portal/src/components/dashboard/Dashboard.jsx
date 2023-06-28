import React from 'react'
import UpcomingExams from './UpcomingExams'
import AnnounceCard from '../UI/Cards/AnnounceCard'
import AttendCard from '../UI/Cards/AttendCard'
import EventCard from '../UI/Cards/EventCard'
import styles from './Dashboard.module.css'
import OtherAnnounceCard from '../UI/Cards/OtherAnnounceCard'

const Dashboard = () => {
    const dashboard = styles.dashboard + " flex flex-col gap-8 p-8"
    return (
        <div className={dashboard}>
            <h1 className="text-4xl font-semibold">Dashboard</h1>
            <div className="flex flex-col gap-4">
                <h1 className="text-xl p-1 font-semibold heading">Announcements</h1>
                <AnnounceCard />
            </div>
            {/* <div className="flex flex-col gap-4">
                <h1 className="text-xl p-1 font-semibold heading">Attendance</h1>
                <AttendCard />
            </div> */}
            <div className="flex flex-col gap-6 mt-6">
                <h1 className="text-xl p-1 font-semibold heading">Upcoming Exams</h1>
                <UpcomingExams />
            </div>
            <div className="flex flex-col gap-4 mt-6">
                <h1 className="text-xl p-1 font-semibold heading">Other Announcements</h1>
                <OtherAnnounceCard />
            </div>
            <div className="flex flex-col gap-4 mt-2">
                <h1 className="text-xl p-1 font-semibold heading">Upcoming Events</h1>
                <EventCard />
            </div>
        </div>
    )
}

export default Dashboard