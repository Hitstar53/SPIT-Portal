import React, { useState } from 'react'
import CustTable from '../../UI/CustTable'
import Search from './Search'
import styles from './FilterLayout.module.css'

const Professional = () => {
  const container = styles.container + " flex flex-col gap-8 p-8";
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className={container}>
      <div className="flex justify-between items-center text-4xl font-semibold">
        <p>Student Search</p>
        <Search
          filterHandler={() => setFilterOpen(!filterOpen)}
        />
      </div>
      {filterOpen && (
        <div className="mt-2">
          <p className="text-xl font-semibold">Available Filters</p>
        </div>
      )}
      <div className="mt-6">
        <CustTable />
      </div>
    </div>
  );
}

export default Professional