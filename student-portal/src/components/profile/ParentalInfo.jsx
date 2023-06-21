import React, { useState } from "react";
import ParentInfoForm from "./profileforms/ParentInfoForm";
import { FaEdit,FaSave } from "react-icons/fa";
import Modal from "../UI/Modal";
import { TextField } from "@mui/material";
import Fab from '@mui/material/Fab';
import styles from "./ParentalInfo.module.css";

const ParentalInfo = (props) => {
  const [edit, setEdit] = useState(false);
  const handleClickEdit = () => {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  };
  return (
    <div className={styles.parentalInfo}>
      <h3 className={styles.header}>
        Parental Information
        {
          edit ? <FaEdit onClick={handleClickEdit} className={styles.titleIcon} />
          :<Fab sx={{display:"flex",gap:"0.5rem"}} variant="extended" size="small" color="primary" aria-label="add">
              <FaSave />
              Save
           </Fab>
      }
      </h3>
      
      <div className={styles.PartInfo}>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-user"></i>
          {!edit && (
            <span className={styles.iconInfo}>{props.info.fname}</span>
          )}
          {edit && (
            <TextField
              id="outlined-required"
              label="Father Name"
              type="text"
              defaultValue={props.info.fname}
            />
          )}
        </div>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-user"></i>
          {!edit && (
            <span className={styles.iconInfo}>{props.info.mname}</span>
          )}
          {edit && (
            <TextField
              id="outlined-required"
              label="Mother Name"
              type="text"
              defaultValue={props.info.mname}
            />
          )}
        </div>
      </div>
      <div className={styles.PartInfo}>
        <div className={styles.twoCol}>
          <i className="fas fa-phone"></i>
          {!edit && (
            <span className={styles.iconInfo}>{props.info.fphone}</span>
          )}
          {edit && (
            <TextField
              id="outlined-required"
              label="Father Phone Number"
              type="text"
              defaultValue={props.info.fphone}
            />
          )}
        </div>
        <div className={styles.twoCol}>
          <i className="fas fa-phone"></i>
          {!edit && (
            <span className={styles.iconInfo}>{props.info.mphone}</span>
          )}
          {edit && (
            <TextField
              id="outlined-required"
              label="Mother Phone Number"
              type="text"
              defaultValue={props.info.mphone}
            />
          )}
        </div>
      </div>
      <div className={styles.PartInfo}>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-envelope"></i>
          {!edit && (
            <span className={styles.iconInfo}>{props.info.femail}</span>
          )}
          {edit && (
            <TextField
              id="outlined-required"
              label="Father Email"
              type="text"
              defaultValue={props.info.femail}
            />
          )}
        </div>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-envelope"></i>
          {!edit && (
            <span className={styles.iconInfo}>{props.info.memail}</span>
          )}
          {edit && (
            <TextField
              id="outlined-required"
              label="Mother Phone Number"
              type="text"
              defaultValue={props.info.memail}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentalInfo;
