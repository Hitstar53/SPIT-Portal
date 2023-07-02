import React from "react";
import { useLoaderData, json } from "react-router-dom";
import styles from "./Profile.module.css";
import ProfileHeader from "./ProfileHeader";
import PersonalInfo from "./PersonalInfo";
import ParentalInfo from "./ParentalInfo";
import EduInfo from "./EduInfo";

const Profile = () => {
  const data = useLoaderData();
  return (
    <div className={styles.profile}>
      <ProfileHeader info={data.profileHeaderData} />
      <PersonalInfo info={data.personalData} />
      <ParentalInfo info={data.parentalData} />
      <EduInfo info={data.eduData} />
    </div>
  )
}

export default Profile;

export async function loader() {
  const response1 = await fetch(
    "http://localhost:8000/api/student/getPersonal",
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
  const response2 = await fetch(
    "http://localhost:8000/api/student/getParental",
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
  const response3 = await fetch(
    "http://localhost:8000/api/student/getMiniDrawer",
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
  const response4 = await fetch(
    "http://localhost:8000/api/student/getEdu",
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
  if (!response1.ok || !response2.ok || !response3.ok || !response4.ok) {
    throw json({ message: "Could not fetch profile information" }, {status: 422});
  }
  if (response1.ok && response2.ok && response3.ok && response4.ok) {
    const personalData = await response1.json();
    const parentalData = await response2.json();
    const profileHeaderData = await response3.json();
    const eduData = await response4.json();
    return { profileHeaderData, personalData, parentalData, eduData };
  }
}