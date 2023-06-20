import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import Modal from "../UI/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
// import CustDatePicker from "../../UI/CustDatePicker";
import styles from "./PersonalInfo.module.css";
import PersonalInfoForm from "./profileforms/PersonalInfoForm";

const PersonalInfo = (props) => {
  const [open, setOpen] = useState(false);
  // const handleClickOpen = () => {
  //   if (!open) {
  //     setOpen(true);
  //   } else {
  //     setOpen(false);
  //   }
  // };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  };
  return (
    <div className={styles.personalInfo}>
      <h3 className={styles.header}>
        Personal Information
        <FaEdit onClick={handleClickOpen} className={styles.titleIcon} />
      </h3>
      {open && (
        <Modal
          open={open}
          title="Edit Personal Information"
          action="Save"
          onClose={handleClose}
          form="persinfoform"
        >
          <PersonalInfoForm 
            info={props.info}
            onSubmit={handleSubmit}
          />
        </Modal>
      )}
      <div className={styles.PersInfo}>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-phone"></i>
          {!open && <span className={styles.iconInfo}>+91 {props.info.phone}</span>}
          {open && (
            <TextField
              id="outlined-required"
              label="Mobile Number"
              type="text"
              defaultValue={props.info.phone}
            />
          )}
        </div>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-envelope"></i>
          <span className={styles.iconInfo}>{props.info.email}</span>
        </div>
      </div>
      <div style={{ marginBottom: "40px" }} className={styles.PersInfo}>
        <i className="fa-solid fa-location-dot"></i>
        <span className={styles.iconInfo}>{props.info.address}</span>
      </div>
      <div className={styles.PersInfo}>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-calendar-days"></i>
          <span className={styles.iconInfo}>{props.info.dob}</span>
        </div>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-venus-mars"></i>
          <span className={styles.iconInfo}>{props.info.gender}</span>
        </div>
      </div>
      <div className={styles.PersInfo}>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-droplet"></i>
          <span className={styles.iconInfo}>{props.info.blood}</span>
        </div>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-hands-praying"></i>
          <span className={styles.iconInfo}>{props.info.religion}</span>
        </div>
      </div>
      <div className={styles.PersInfo}>
        <div className={styles.twoCol}>
          <i className="fa-brands fa-linkedin"></i>
          <span className={styles.iconInfo}>{props.info.linkedin}</span>
        </div>
        <div className={styles.twoCol}>
          <i className="fa-brands fa-github"></i>
          <span className={styles.iconInfo}>{props.info.github}</span>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
