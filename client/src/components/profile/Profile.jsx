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
      <ProfileHeader />
      <PersonalInfo info={data} />
      <ParentalInfo />
      <EduInfo />
    </div>
  )
}

export default Profile;

export async function loader() {
  const response = await fetch(
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
  if (!response.ok) {
    throw json({ message: "Could not fetch Info" }, { status: 422 });
  } else {
    return response;
  }
}