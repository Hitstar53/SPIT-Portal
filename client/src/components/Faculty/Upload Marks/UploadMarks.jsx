import React,{useRef} from 'react'
import DropZone from '../DropZone'
import styles from './UploadMarks.module.css'
import {read,utils} from "xlsx"

const UploadMarks = () => {
  const fileRef = useRef()
  const handleSubmit = async (e) =>{
    e.preventDefault()
    const file = fileRef.current.files[0]
    const f = await file.arrayBuffer()
    const wb = read(f)
    const ws = wb.Sheets[wb.SheetNames[0]]
    const data = utils.sheet_to_json(ws)
    console.log(data)
  }
  return (
    <div className={styles.container}>
        <h1 className={styles.heading}>Upload Marks</h1>
        <form onSubmit={handleSubmit} >
          <input ref={fileRef}  type="file" className={styles.input}/>
          <button className={styles.submit}>Submit</button>
        </form>
    </div>
  )
}

export default UploadMarks