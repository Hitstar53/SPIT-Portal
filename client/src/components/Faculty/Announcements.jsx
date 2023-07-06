import React from 'react'
import styles from './Announcements.module.css'
import Announcement from './Ancmnts.jsx'
import Exams from './Exams'



const Announcements = () => {
  const container = styles.container + " flex flex-col gap-8 p-8";

  return (
    <div className={styles.announcement}>
      <Announcement />
      <Exams />
    </div>
  )
}

export default Announcements
