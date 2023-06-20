import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import Modal from "../UI/Modal";
import Carousel from "../UI/Carousel";
import styles from "./EduInfo.module.css";

const EduInfo = () => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    return (
      <div className={styles.eduInfo}>
        <h3 className={styles.header}>
          Educational Information
          <FaEdit onClick={handleClickOpen} className={styles.titleIcon} />
        </h3>
        {open && (
            <Modal
            open={open}
            title="Edit Profile Details"
            action="Save"
            onClose={handleClose}
            >
            <EduInfoForm />
            </Modal>
        )}
        <Carousel />
      </div>
    );
}

export default EduInfo;

