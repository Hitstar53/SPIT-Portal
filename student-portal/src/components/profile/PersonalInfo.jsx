import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import Modal from "../UI/Modal";
import styles from "./PersonalInfo.module.css";
import PersonalInfoForm from "./profileform/PersonalInfoForm";

const PersonalInfo = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
          title="Edit Profile Details"
          action="Save"
          onClose={handleClose}
        >
          <PersonalInfoForm />
        </Modal>
      )}
      <div className={styles.PersInfo}>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-phone"></i>
          <span className={styles.iconInfo}>+91 {props.info.phone}</span>
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
