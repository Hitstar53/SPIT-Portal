import React from 'react'
import styles from './Announcements.module.css'

const Announcements = () => {
  const container = styles.container + " flex flex-col gap-8 p-8";
  return (
    <div className={container}>
      Announcements Page
    </div>
  )
}

export default Announcements
