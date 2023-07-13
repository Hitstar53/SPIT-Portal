import React from 'react'
import { useLoaderData, json } from 'react-router-dom'
import UpcomingExams from './UpcomingExams'
import AnnounceCard from '../UI/Cards/AnnounceCard'
import EventCard from '../UI/Cards/EventCard'
import styles from './Dashboard.module.css'
import OtherAnnounceCard from '../UI/Cards/OtherAnnounceCard'
import ServerUrl from '../../constants'

const Dashboard = () => {
    const data = useLoaderData()
    const announcements = data.announceData
    const academic = announcements.filter((item) => item.type === "Academic").reverse()
    const other = announcements.filter((item) => item.type === "General").reverse()
    const dashboard = styles.dashboard + " flex flex-col gap-8 p-8"
    return (
        <div className={dashboard}>
            <h1 className="text-4xl font-semibold">Dashboard</h1>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl p-1 font-semibold heading">Academic Announcements</h1>
                <AnnounceCard data={academic} />
            </div>
            <div className="flex flex-col gap-6 mt-6">
                <h1 className="text-2xl p-1 font-semibold heading">Upcoming Exams</h1>
                <UpcomingExams data={data.examData.exams} />
            </div>
            <div className="flex flex-col gap-4 mt-6">
                <h1 className="text-2xl p-1 font-semibold heading">Other Announcements</h1>
                <OtherAnnounceCard data={other} />
            </div>
            <div className="flex flex-col gap-4 mt-2">
                <h1 className="text-2xl p-1 font-semibold heading">Upcoming Events</h1>
                <EventCard data={data.eventsData} />
            </div>
        </div>
    )
}

export default Dashboard

export async function loader() {
    const response1 = await fetch(`${ServerUrl}/api/student/getStudentAnnouncements`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: JSON.parse(localStorage.getItem("userinfo")).email,
      }),
    });
    const response2 = await fetch(`${ServerUrl}/api/student/getEvents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response3 = await fetch(`${ServerUrl}/api/student/getUpcomingExams`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: JSON.parse(localStorage.getItem("userinfo")).email,
      }),
    });
    if (!response1.ok || !response2.ok || !response3.ok) {
      throw json(
        { message: "Could not fetch dashboard information" },
        { status: 422 }
      );
    }
    if (response1.ok && response2.ok && response3.ok) {
      const announceData = await response1.json();
      const eventsData = await response2.json();
      const examData = await response3.json();
      return { announceData, eventsData, examData };
    }
}
