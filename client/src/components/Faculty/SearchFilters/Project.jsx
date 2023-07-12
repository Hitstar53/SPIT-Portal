import React, { useState } from 'react'
import CustTable from '../../UI/CustTable'
import Search from './Search'
import Filter from './Filter'
import styles from './FilterLayout.module.css'

const rows = [
  {
    uid: 2021300108,
    studentname: "Hatim Sawai",
    email: "hatim.sawai@spit.ac.in",
    project: "Attendance Management System",
    domain: "Computer Vision",
    techstack: "Python, OpenCV",
  },
  {
    uid: 2021300109,
    studentname: "Kaif Sayyed",
    email: "kaif.sayyed@spit.ac.in",
    project: "Health App",
    domain: "App Development",
    type: "Flutter, Firebase",
  },
]

const filters = [
  {
    id: "domain",
    label: "Domain",
  },
  {
    id: "techstack",
    label: "Tech Stack",
  },
]

const options = [
  {
    name: "All",
    value: "All",
  },
  {
    name: "F.E.",
    value: "F.E.",
  },
  {
    name: "S.E.",
    value: "S.E.",
  },
  {
    name: "T.E.",
    value: "T.E.",
  },
  {
    name: "B.E.",
    value: "B.E.",
  }
]


const Project = () => {
  const container = styles.container + " flex flex-col gap-8 p-8";

  const [newRows, setNewRows] = useState(rows);
  // setNewRows = () => {

  // };

  return (
    <div className={container}>
      <div className="flex justify-between items-center text-4xl font-semibold">
        <p>Student Search</p>
        <Search />
      </div>
      <Filter
        options={options}
        filters={filters}
      />
      <div className="mt-6">
        <CustTable rows={newRows} />
      </div>
    </div>
  );
}

export default Project