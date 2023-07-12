import React from 'react'
import styles from './Faculty.module.css'
import EventCard from '../UI/Cards/EventCard'
import ServerUrl from '../../constants'
import { json, useLoaderData } from 'react-router-dom'

const Faculty = () => {
  const container = styles.container + " flex flex-col gap-8 p-8";
  const facultyName = JSON.parse(localStorage.getItem("userinfo")).name
  const data = useLoaderData();
  return (
    <div className={container}>
      <h1 className="text-4xl font-semibold">Welcome, {facultyName}! 👋</h1>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl p-1 font-semibold heading">Upcoming Events</h1>
      </div>
      <EventCard data={data} />
    </div>
  );
}

export default Faculty

export async function loader() {
  const response = await fetch(`${ServerUrl}/api/student/getEvents`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    return json({ message: "Something went wrong" }, {status: 422});
  }
  const data = await response.json();
  return data;
}