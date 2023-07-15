import React, { useState } from 'react'
import CustTable from '../../UI/CustTable'
import Search from './Search'
import Filter from './Filter'
import styles from './FilterLayout.module.css'

const rows = [
  {
    uid: 2021300108,
    name: "Hatim Sawai",
    email: "hatim.sawai@spit.ac.in",
    branch: "Computer Engineering",
    batch: "B",
    committee: "Oculus Coding League",
    event: "S.E. Hackathon, IPL Auction",
    cgpa: 9.5,
  },
  {
    uid: 2021300109,
    name: "Kaif Sayyed",
    email: "kaif.sayyed@spit.ac.in",
    branch: "Computer Engineering",
    batch: "B",
    committee: "",
    event: "Pitch Perfect",
    cgpa: 8.1,
  },
]

const filters = [
  {
    id: "uid",
    label: "U.I.D.",
  },
  {
    id: "branch",
    label: "Branch",
  },
  {
    id: "batch",
    label: "Batch",
  },
  {
    id: "committee",
    label: "Committee",
  },
  {
    id: "event",
    label: "Event",
  },
  {
    id: "cgpa",
    label: "CGPA",
  },
]

const options = [
  {
    name: "All",
    value: "All",
  },
  {
    name: "FE",
    value: "F.E.",
  },
  {
    name: "SE",
    value: "S.E.",
  },
  {
    name: "TE",
    value: "T.E.",
  },
  {
    name: "BE",
    value: "B.E.",
  }
]

const headCells = [
  {
    id: "uid",
    numeric: true,
    label: "UID",
  },
  {
    id: "name",
    numeric: false,
    label: "Name",
  },
  {
    id: "email",
    numeric: false,
    label: "Email",
  },
  {
    id: "branch",
    numeric: false,
    label: "Branch",
  },
  {
    id: "batch",
    numeric: false,
    label: "Batch",
  },
  {
    id: "committee",
    numeric: false,
    label: "Committee",
  },
  {
    id: "event",
    numeric: false,
    label: "Events",
  },
  {
    id: "cgpa",
    numeric: true,
    label: "CGPA",
  },
];


const Info = () => {
  const container = styles.container + " flex flex-col gap-8 p-8";

  return (
    <div className={container}>
      <div className="flex justify-between items-center text-4xl font-semibold">
        <p>Student Info Search</p>
        <Search />
      </div>
      <Filter
        options={options}
        filters={filters}
      />
      <div className="mt-6">
        <CustTable rows={rows} headCells={headCells} />
      </div>
    </div>
  );
}

export default Info