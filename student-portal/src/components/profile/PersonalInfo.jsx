import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import Modal from "../UI/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CustDatePicker from "../UI/CustDatePicker";
import styles from "./PersonalInfo.module.css";

const PersonalInfo = (props) => {
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
    <div className={styles.personalInfo}>
      <h3 className={styles.header}>
        Personal Information
        <FaEdit onClick={handleClickEdit} className={styles.titleIcon} />
      </h3>
      <div className={styles.PersInfo}>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-phone"></i>
          {!edit && (
            <span className={styles.iconInfo}>+91 {props.info.phone}</span>
          )}
          {edit && (
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
          {!edit && <span className={styles.iconInfo}>{props.info.email}</span>}
          {edit && (
            <TextField
              id="outlined-required"
              label="Email"
              type="email"
              defaultValue={props.info.email}
            />
          )}
        </div>
      </div>
      <div style={{ marginBottom: "40px" }} className={styles.PersInfo}>
        <i className="fa-solid fa-location-dot"></i>
        {!edit && <span className={styles.iconInfo}>{props.info.address}</span>}
        {edit && (
          <TextField
            id="outlined-required"
            label="Address"
            type="text"
            defaultValue={props.info.address}
            sx = {{width:"100%"}}
          />
        )}
      </div>
      <div className={styles.PersInfo}>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-calendar-days"></i>
          {!edit && <span className={styles.iconInfo}>{props.info.dob}</span>}
          {edit && (
            <CustDatePicker
              label="Date of Birth"
              defaultValue={props.info.dob}
            />
          )}
        </div>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-venus-mars"></i>
          {!edit && (
            <span className={styles.iconInfo}>{props.info.gender}</span>
          )}
          {edit && (
            <TextField
              id="outlined-required"
              select
              label="Gender"
              defaultValue={props.info.gender}
            >
              <MenuItem key="Male" value="Male">
                Male
              </MenuItem>
              <MenuItem key="Female" value="Female">
                Female
              </MenuItem>
              <MenuItem key="Other" value="Other">
                Other
              </MenuItem>
            </TextField>
          )}
        </div>
      </div>
      <div className={styles.PersInfo}>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-droplet"></i>
          {!edit && <span className={styles.iconInfo}>{props.info.blood}</span>}
          {edit && (
            <TextField
              id="outlined-required"
              label="Blood Group"
              type="text"
              defaultValue={props.info.blood}
            />
          )}
        </div>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-hands-praying"></i>
          {!edit && (
            <span className={styles.iconInfo}>{props.info.religion}</span>
          )}
          {edit && (
            <TextField
              id="outlined-required"
              label="Religion"
              type="text"
              defaultValue={props.info.religion}
            />
          )}
        </div>
      </div>
      <div className={styles.PersInfo}>
        <div className={styles.twoCol}>
          <i className="fa-brands fa-linkedin"></i>
          {!edit && (
            <span className={styles.iconInfo}>{props.info.linkedin}</span>
          )}
          {edit && (
            <TextField
              id="outlined-required"
              label="LinkedIn"
              type="text"
              defaultValue={props.info.linkedin}
            />
          )}
        </div>
        <div className={styles.twoCol}>
          <i className="fa-brands fa-github"></i>
          {!edit && (
            <span className={styles.iconInfo}>{props.info.github}</span>
          )}
          {edit && (
            <TextField
              id="outlined-required"
              label="Github"
              type="text"
              defaultValue={props.info.github}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
