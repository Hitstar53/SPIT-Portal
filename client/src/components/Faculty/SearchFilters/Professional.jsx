import React from 'react'
import CustTable from '../../UI/CustTable'
import styles from './FilterLayout.module.css'

const Professional = () => {
  const container = styles.container + " flex flex-col gap-8 p-8";
  return (
    <div className={container}>
      <div className="text-4xl font-semibold">
        Student Search
      </div>
      <div className="mt-6">
        <CustTable />
      </div>
    </div>
  );
}

export default Professional