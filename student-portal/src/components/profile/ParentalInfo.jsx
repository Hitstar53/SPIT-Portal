import React, { useState,useEffect } from "react";
import { FaEdit,FaSave } from "react-icons/fa";
import { TextField } from "@mui/material";
import Fab from '@mui/material/Fab';
import { Box } from "@mui/material";
import styles from "./ParentalInfo.module.css";

const ParentalInfo = (props) => {
  const [parentalInfo, setParentalInfo] = useState({})
  const [edit, setEdit] = useState(false);
  const handleClickEdit = () => {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
    }

  };
  useEffect(() => {
    setParentalInfo({
      fname: props.info.fname,
      mname: props.info.mname,
      fphone: props.info.fphone,
      mphone: props.info.mphone,
      femail: props.info.femail,
      memail: props.info.memail,
    })
  },[])
  const handleChange = (e) => {
    setParentalInfo({...parentalInfo,[e.target.name]:e.target.value})
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setEdit(false)
  };
  return (
    <Box
      className={styles.personalInfo}
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
        "& .MuiOutlinedInput-input": { color: "var(--text-color) !important" },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--dark-override-color) !important",
        },
        "& .MuiInputLabel-root": { color: "var(--text-color) !important" },
        "& .Mui-focused": { color: "var(--dark-override-color) !important" },
      }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <div className={styles.parentalInfo}>
        <h3 className={styles.header}>
          Parental Information
          {!edit ? (
            <FaEdit onClick={handleClickEdit} className={styles.titleIcon} />
          ) : (
            <Fab
              type="submit"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontWeight: "bold",
                borderRadius: "10px",
                backgroundColor: "var(--secondary-color)",
                color: "var(--text-color)",
                padding: "0.5rem 1rem",
                ":hover": {
                  backgroundColor: "var(--secondary-color)",
                },
              }}
              variant="extended"
              size="small"
              color="primary"
              aria-label="add"
            >
              <FaSave />
              Save
            </Fab>
          )}
        </h3>

        <div className={styles.PartInfo}>
          <div className={styles.twoCol}>
            <i className="fa-solid fa-user"></i>
            {!edit && (
              <span className={styles.iconInfo}>{parentalInfo.fname}</span>
            )}
            {edit && (
              <TextField
                name="fname"
                id="outlined-required"
                onChange={handleChange}
                label="Father Name"
                type="text"
                defaultValue={parentalInfo.fname}
              />
            )}
          </div>
          <div className={styles.twoCol}>
            <i className="fa-solid fa-user"></i>
            {!edit && (
              <span className={styles.iconInfo}>{parentalInfo.mname}</span>
            )}
            {edit && (
              <TextField
                name="mname"
                id="outlined-required"
                onChange={handleChange}
                label="Mother Name"
                type="text"
                defaultValue={parentalInfo.mname}
              />
            )}
          </div>
        </div>
        <div className={styles.PartInfo}>
          <div className={styles.twoCol}>
            <i className="fas fa-phone"></i>
            {!edit && (
              <span className={styles.iconInfo}>+91 {parentalInfo.fphone}</span>
            )}
            {edit && (
              <TextField
                InputLabelProps={{
                  sx: {
                    color: "var(--text-color)",
                  },
                }}
                name="fphone"
                onChange={handleChange}
                id="outlined-required"
                label="Father Phone Number"
                type="text"
                defaultValue={parentalInfo.fphone}
              />
            )}
          </div>
          <div className={styles.twoCol}>
            <i className="fas fa-phone"></i>
            {!edit && (
              <span className={styles.iconInfo}>+91 {parentalInfo.mphone}</span>
            )}
            {edit && (
              <TextField
                name="mphone"
                id="outlined-required"
                onChange={handleChange}
                label="Mother Phone Number"
                type="text"
                defaultValue={parentalInfo.mphone}
              />
            )}
          </div>
        </div>
        <div className={styles.PartInfo}>
          <div className={styles.twoCol}>
            <i className="fa-solid fa-envelope"></i>
            {!edit && (
              <span className={styles.iconInfo}>{parentalInfo.femail}</span>
            )}
            {edit && (
              <TextField
                name="femail"
                id="outlined-required"
                onChange={handleChange}
                label="Father Email"
                type="text"
                defaultValue={parentalInfo.femail}
              />
            )}
          </div>
          <div className={styles.twoCol}>
            <i className="fa-solid fa-envelope"></i>
            {!edit && (
              <span className={styles.iconInfo}>{parentalInfo.memail}</span>
            )}
            {edit && (
              <TextField
                name="memail"
                id="outlined-required"
                onChange={handleChange}
                label="Mother Phone Number"
                type="text"
                defaultValue={parentalInfo.memail}
              />
            )}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ParentalInfo;
