import React from 'react'
import { useLoaderData } from "react-router-dom";
import styles from './Announcements.module.css'
import Announcement from './Ancmnts.jsx'
import Exams from './Exams'
import ServerUrl from "../../../constants";

const Announcements = () => {
  const data = useLoaderData();
  const container = styles.container + " flex flex-col gap-8 p-8";
  return (
    <div className={container}>
      <Announcement data={data.announcements.reverse()} />
      <Exams data={data.upcomingExams.reverse()} />
    </div>
  )
}

export default Announcements

export async function loader() {
  const response1 = await fetch(
    `${ServerUrl}/api/student/getFacultyAnnouncements`,
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
  if (!response1.ok) {
    throw json(
      { message: "Could not fetch announcement information" },
      { status: 422 }
    );
  }
  if (response1.ok) {
    const data = await response1.json();
    return data;
  }
}