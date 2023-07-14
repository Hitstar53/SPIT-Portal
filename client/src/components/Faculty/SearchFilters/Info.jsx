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
    branch: "Computer Engineering",
    batch: "B",
    committee: "Oculus Coding League",
    event: [
      {
        name: "S.E. Hackathon",
      },
      {
        name: "IPL Auction",
      }
    ],
    cgpa: 9.5,
  },
  {
    uid: 2021300109,
    studentname: "Kaif Sayyed",
    email: "kaif.sayyed@spit.ac.in",
    branch: "Computer Engineering",
    batch: "B",
    committee: "",
    event: [
      {
        name: "Pitch Perfect",
      }
    ],
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


const Info = () => {
  const container = styles.container + " flex flex-col gap-8 p-8";

  const [newRows, setNewRows] = useState(rows);
  // setNewRows = () => {

  // };

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
        <CustTable rows={newRows} />
      </div>
    </div>
  );
}

export default Info