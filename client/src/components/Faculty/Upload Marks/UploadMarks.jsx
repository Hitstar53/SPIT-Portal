import React from 'react'
import DropZone from '../DropZone'
import styles from './UploadMarks.module.css'

const UploadMarks = () => {
  return (
    <div className={styles.container}>
        <h1 className={styles.heading}>Upload Marks</h1>
        {/* <DropZone /> */}
        <input type="file" className={styles.input}/>
        <button className={styles.submit}>Submit</button>
    </div>
  )
}

export default UploadMarks