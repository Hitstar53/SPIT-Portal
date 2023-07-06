import React from 'react'
import CustTable from '../../UI/CustTable'
import Search from './Search'
import styles from './FilterLayout.module.css'

const Professional = () => {
  const container = styles.container + " flex flex-col gap-8 p-8";
  return (
    <div className={container}>
      <div className="flex justify-between items-center text-4xl font-semibold">
        <p>Student Search</p>
        <Search />
      </div>
      <div className="mt-6">
        <CustTable />
      </div>
    </div>
  );
}

export default Professional