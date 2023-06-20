import React, { useState } from "react";
import ParentInfoForm from "./profileform/ParentInfoForm";
import { FaEdit } from "react-icons/fa";
import Modal from "../UI/Modal";
import styles from "./ParentalInfo.module.css";

const ParentalInfo = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={styles.parentalInfo}>
      <h3 className={styles.header}>
        Parental Information
        <FaEdit onClick={handleClickOpen} className={styles.titleIcon} />
      </h3>
      {open && (
        <Modal
          open={open}
          title="Edit Profile Details"
          action="Save"
          onClose={handleClose}
        >
          <ParentInfoForm />
        </Modal>
      )}
      <div className={styles.PartInfo}>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-user"></i>
          <span className={styles.iconInfo}>{props.info.fname}</span>
        </div>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-user"></i>
          <span className={styles.iconInfo}>{props.info.mname}</span>
        </div>
      </div>
      <div className={styles.PartInfo}>
        <div className={styles.twoCol}>
          <i className="fas fa-phone"></i>
          <span className={styles.iconInfo}>+91 {props.info.fphone}</span>
        </div>
        <div className={styles.twoCol}>
          <i className="fas fa-phone"></i>
          <span className={styles.iconInfo}>+91 {props.info.mphone}</span>
        </div>
      </div>
      <div className={styles.PartInfo}>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-envelope"></i>
          <span className={styles.iconInfo}>{props.info.femail}</span>
        </div>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-envelope"></i>
          <span className={styles.iconInfo}>{props.info.memail}</span>
        </div>
      </div>
    </div>
  );
};

export default ParentalInfo;
