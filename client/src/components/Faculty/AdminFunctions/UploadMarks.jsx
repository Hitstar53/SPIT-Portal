import React,{ useState,useRef } from 'react'
import { useNavigate } from "react-router-dom";
import DropZone from '../DropZone'
import CustAlert from "../../UI/CustAlert";
import styles from './UploadMarks.module.css'
import {read,utils} from "xlsx"

const UploadMarks = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
    navigate(0);
  };
  const fileRef = useRef()
  const handleSubmit = async (e) =>{
    e.preventDefault()
    const file = fileRef.current.files[0]
    const f = await file.arrayBuffer()
    const wb = read(f)
    const ws = wb.Sheets[wb.SheetNames[0]]
    const data = utils.sheet_to_json(ws)
    console.log(data)
    setAlertOpen(true);
    setSeverity("success");
    setMessage("Marks Uploaded!");
  }
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} >
        <input ref={fileRef}  type="file" className={styles.input}/>
        <button className={styles.submit}>Submit</button>
      </form>
      <CustAlert
        open={alertOpen}
        onClose={handleAlertClose}
        severity={severity}
        message={message}
      />
    </React.Fragment>
  )
}

export default UploadMarks