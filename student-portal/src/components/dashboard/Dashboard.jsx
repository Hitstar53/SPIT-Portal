import React from 'react'
import AnnounceCard from '../UI/Cards/AnnounceCard'

const Dashboard = () => {
    return (
        <div className="dashboard flex flex-col gap-6 p-8" style={{minHeight: "calc(100vh - 64px)"}}>
            <h1 className="text-4xl font-semibold">Dashboard</h1>
            <div className="flex flex-col gap-4">
                <h1 className="text-xl p-1">Announcements</h1>
                <AnnounceCard />
            </div>
        </div>
    )
}

export default Dashboard