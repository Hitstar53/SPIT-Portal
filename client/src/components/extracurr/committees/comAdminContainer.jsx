import React from 'react'
import { useLoaderData } from "react-router-dom";
import styles from '../../Faculty/Announcements/Announcements.module.css'

import ServerUrl from "../../../constants";

const committeeAnnouncements = () => {
  const data = useLoaderData();
  const container = styles.container + " flex flex-col gap-8 p-8";
  return (
    <div className={container}>
    </div>
  )
}

export default committeeAnnouncements

export async function loader() {
  const response1 = await fetch(
    `${ServerUrl}/api/student/getStudentAnnouncements`,
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