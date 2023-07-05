import React from "react";
import styles from "./Committees.module.css";
import CommitteesCard from "./CommitteesCard.jsx";
import { json, useLoaderData } from "react-router-dom";
import ServerUrl from "../../../constants";

const Committees = () => {
  const data = useLoaderData();
  return (
    <div className={styles.committeesPage}>
      <h1 className={styles.heading}>College Committees</h1>
      <div className={styles.comGrid}>
        {data.map((com,index) => (
          <CommitteesCard
            key={index}
            comname={com.name}
            commen={com.facultyMentor}
          />
        ))}
      </div>
    </div>
  );
};

export default Committees;

export async function loader() {
  const response = await fetch(
    `${ServerUrl}/api/student/getCommitteeNames`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if(!response.ok){
    throw json({message: "Error fetching committees"}, 422)
  }
  const data = await response.json();
  return data;
}