import React, { useState } from 'react'
import { useLoaderData, json } from 'react-router-dom'
import SkillSet from './SkillSet'
import Projects from './Projects'
import Research from './Research'
import styles from './Portfolio.module.css'
import NoData from '../../UI/NoData'
import ServerUrl from '../../../constants'

const Portfolio = () => {
  const container = styles.container + " flex flex-col gap-8 p-8"
  const data = useLoaderData();
  return (
    <div className={container}>
      <h1 className="text-4xl font-semibold">My Portfolio</h1>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl p-1 font-semibold heading">Skill Set</h1>
        {
          data.skillData.skills.length === 0 && 
          <NoData
            title="No Skills Added"
            message="Add your skills to showcase them. (Refresh Page to see changes)"
          />
        }
        <SkillSet skills={data.skillData} />
      </div>
      <div className="flex flex-col gap-4">
        <Projects projects={data.projectData} />
        {
          data.projectData.projects.length === 0 &&
          <NoData
            title="No Projects Added"
            message="Add your projects by clicking on the Add Project button"
          />
        }
      </div>
      <div className="flex flex-col gap-4 mt-2">
        <Research research={data.researchData} />
        {
          data.researchData.research.length === 0 &&
          <NoData
            title="No Research Added"
            message="Add your research by clicking on the Add Research button"
          />
        }
      </div>
    </div>
  );
}

export default Portfolio

export async function loader() {
  const response1 = await fetch(`${ServerUrl}/api/student/getSkills`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: JSON.parse(localStorage.getItem("userinfo")).email,
    }),
  });
  const response2 = await fetch(
    `${ServerUrl}/api/student/getProjects`,
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
    `${ServerUrl}/api/student/getResearch`,
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