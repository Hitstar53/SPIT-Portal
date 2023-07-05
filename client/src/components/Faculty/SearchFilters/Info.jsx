import React from 'react'
import styles from './FilterLayout.module.css'

const Info = () => {
  const container = styles.container + " flex flex-col gap-8 p-8";
  return (
    <div className={container}>
      Informational Filter Page
    </div>
  )
}

export default Info