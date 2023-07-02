import React, { useState } from 'react'
import { useLoaderData, json } from 'react-router-dom'
import SkillSet from './SkillSet'
import Projects from './Projects'
import Research from './Research'
import styles from './Portfolio.module.css'

const Portfolio = () => {
  const container = styles.container + " flex flex-col gap-8 p-8"
  const data = useLoaderData();
  return (
    <div className={container}>
      <h1 className="text-4xl font-semibold">My Portfolio</h1>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl p-1 font-semibold heading">Skill Set</h1>
        <SkillSet skills={data.skillData} />
      </div>
      <div className="flex flex-col gap-4">
        <Projects projects={data.projectData} />
      </div>
      <div className="flex flex-col gap-4 mt-2">
        <Research research={data.researchData} />
      </div>
    </div>
  );
}

export default Portfolio

export async function loader() {
  const response1 = await fetch("http://localhost:8000/api/student/getSkills", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: JSON.parse(localStorage.getItem("userinfo")).email,
    }),
  });
  const response2 = await fetch(
    "http://localhost:8000/api/student/getProjects",
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
    "http://localhost:8000/api/student/getResearch",
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
  if (!response1.ok || !response2.ok || !response3.ok) {
    throw json({ message: "Error fetching Portfolio Information" }, 422);
  }
  if (response1.ok && response2.ok && response3.ok) {
    const skillData = await response1.json();
    const projectData = await response2.json();
    const researchData = await response3.json();
    return { skillData, projectData, researchData };
  }
}