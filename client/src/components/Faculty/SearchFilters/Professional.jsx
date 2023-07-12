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
    Organization: "JP Morgan",
    ctc: "10.5",
    type: "placement",
  },
  {
    uid: 2021300109,
    studentname: "Kaif Sayyed",
    email: "kaif.sayyed@spit.ac.in",
    Organization: "Barclays",
    ctc: "12.5",
    type: "placement",
  },
]

const filters = [
  {
    id: "organization",
    label: "Organization",
  },
  {
    id: "ctc",
    label: "C.T.C.",
  },
]

const options = [
  {
    name: "All",
    value: "All",
  },
  {
    name: "Internship",
    value: "Internship",
  },
  {
    name: "Placement",
    value: "Placement",
  }
]


const Professional = () => {
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

export default Professional