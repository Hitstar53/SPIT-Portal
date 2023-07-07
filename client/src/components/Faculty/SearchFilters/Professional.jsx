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
    ctc: "10.5"
  },
  {
    uid: 2021300109,
    studentname: "Kaif Sayyed",
    email: "kaif.sayyed@spit.ac.in",
    Organization: "Barclays",
    ctc: "12.5"
  },
]


const Professional = () => {
  const container = styles.container + " flex flex-col gap-8 p-8";

  return (
    <div className={container}>
      <div className="flex justify-between items-center text-4xl font-semibold">
        <p>Student Search</p>
        <Search />
      </div>
      <Filter
        placeholder="Select Professional Filters"
        options={[
          { title: "Organization" },
          { title: "CTC" },
        ]}
      />
      <div className="mt-6">
        <CustTable rows={rows} />
      </div>
    </div>
  );
}

export default Professional