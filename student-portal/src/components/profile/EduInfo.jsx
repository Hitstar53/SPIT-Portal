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
      <div className={styles.eduInfo}>
        <h3 className={styles.header}>
          Educational Information
          <FaEdit onClick={handleClickOpen} className={styles.titleIcon} />
        </h3>
        <Carousel />
      </div>
    );
}

export default EduInfo;

