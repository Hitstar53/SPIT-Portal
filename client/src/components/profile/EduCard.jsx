import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustAlert from "../UI/CustAlert";
import styles from "./EduCard.module.css";
import { TextField } from "@mui/material";
import { FaEdit, FaSave } from "react-icons/fa";
import { Fab, Box } from "@mui/material";
import ServerUrl from "../../constants";

const EduCard = (props) => {
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

  const [edit, setEdit] = useState(false);
  const handleClickEdit = () => {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateEduInfo = async () => {
      const response = await fetch(
        `${ServerUrl}/api/student/educational`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("userinfo")).email,
            eduInfo: props.info,
            index: props.index,
          }),
        }
      );
      if (!response.ok) {
        setAlertOpen(true);
        setSeverity("error");
        setMessage("Something went wrong, please try again later");
      }
      if (response.ok) {
        const data = await response.json();
        setAlertOpen(true);
        setSeverity("success");
        setMessage("Education Information Updated Successfully");
      }
    };
    updateEduInfo();
    setEdit(false);
  };
  const key = props.index;
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off"
      className={styles.card}
    >
      <div className={styles.cardInner}>
        <div className={styles.header}>
          <h3 className={styles.heading}>{props?.info?.type} </h3>
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
                borderRadius: "12px",
                backgroundColor: "var(--primary-color)",
                color: "var(--bg-light)",
                padding: "0.5rem 1rem",
                ":hover": {
                  backgroundColor: "var(--tertiary-color)",
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
        </div>
        <div className={styles.row1}>
          <div className={styles.twoCol}>
            {!edit && (
              <p>
                <label className={styles.label}>Institute:&nbsp;&nbsp;</label>
                {props?.info?.insName}
              </p>
            )}
            {edit && (
              <TextField
                id="outlined-required"
                label="Institute"
                type="text"
                name="insName"
                defaultValue={props?.info?.insName}
                onChange={props?.handleChange}
              />
            )}
          </div>
          {key === 0 && (
            <div className={styles.twoColLast}>
              {!edit && (
                <p>
                  <label>Degree:&nbsp;&nbsp;</label>
                  {props?.info?.degree}
                </p>
              )}
              {edit && (
                <TextField
                  id="outlined-required"
                  label="Degree"
                  type="text"
                  name="degree"
                  defaultValue={props?.info?.degree}
                  onChange={props?.handleChange}
                />
              )}
            </div>
          )}
          {(key === 1 || key === 2) && (
            <div className={styles.twoColLast}>
              {!edit && (
                <p>
                  <label>Qualification:&nbsp;&nbsp;</label>
                  {props.info.degree}
                </p>
              )}
              {edit && (
                <TextField
                  id="outlined-required"
                  label="Qualification"
                  type="text"
                  name="degree"
                  defaultValue={props?.info?.degree}
                  onChange={props?.handleChange}
                />
              )}
            </div>
          )}
        </div>
        {key === 0 && (
          <div className={styles.row2}>
            <div className={styles.threeCol}>
              {!edit && (
                <p>
                  <label>Branch:&nbsp;&nbsp;</label>
                  {props?.info?.branch}
                </p>
              )}
              {edit && (
                <TextField
                  id="outlined-required"
                  label="Branch"
                  type="text"
                  name="branch"
                  defaultValue={props?.info?.branch}
                  onChange={props?.handleChange}
                />
              )}
            </div>
            <div className={styles.threeColMiddle}>
              {!edit && (
                <p>
                  <label>Division:&nbsp;&nbsp;</label>
                  {props?.info?.division}
                </p>
              )}
              {edit && (
                <TextField
                  id="outlined-required"
                  label="Division"
                  type="text"
                  name="division"
                  defaultValue={props?.info?.division}
                  onChange={props?.handleChange}
                />
              )}
            </div>
            <div className={styles.threeColLast}>
              {!edit && (
                <p>
                  <label>Semester:&nbsp;&nbsp;</label>
                  {props?.info?.semester}
                </p>
              )}
              {edit && (
                <TextField
                  id="outlined-required"
                  label="Semester"
                  type="text"
                  name="semester"
                  defaultValue={props?.info?.semester}
                  onChange={props?.handleChange}
                />
              )}
            </div>
          </div>
        )}
        {key === 0 && (
          <div className={styles.row3}>
            {key === 0 && (
              <div className={styles.threeCol}>
                {!edit && (
                  <p>
                    <label>Admission Year:&nbsp;&nbsp;</label>
                    {props?.info?.admissionYear}
                  </p>
                )}
                {edit && (
                  <TextField
                    id="outlined-required"
                    label="Admission Year"
                    type="text"
                    name="admissionYear"
                    defaultValue={props?.info?.admissionYear}
                    onChange={props?.handleChange}
                  />
                )}
              </div>
            )}
            {key == 0 && (
              <div className={styles.threeColMiddle}>
                {!edit && (
                  <p>
                    <label>Passing Year:&nbsp;&nbsp;</label>
                    {props?.info?.passingYear}
                  </p>
                )}
                {edit && (
                  <TextField
                    id="outlined-required"
                    label="Passing Year"
                    type="text"
                    name="passingYear"
                    defaultValue={props?.info?.passingYear}
                    onChange={props?.handleChange}
                  />
                )}
              </div>
            )}
            {key === 0 && (
              <div className={styles.threeColLast}>
                {!edit && (
                  <p>
                    <label>CGPA:&nbsp;&nbsp;</label>
                    {props?.info?.score}
                  </p>
                )}
                {edit && (
                  <TextField
                    id="outlined-required"
                    label="CGPA"
                    type="text"
                    name="score"
                    defaultValue={props?.info?.score}
                    onChange={props?.handleChange}
                  />
                )}
              </div>
            )}
          </div>
        )}
        {(key === 1 || key === 2) && (
          <div className={styles.row1}>
            {(key == 1 || key == 2) && (
              <div className={styles.threeCol}>
                {!edit && (
                  <p>
                    <label>Passing Year:&nbsp;&nbsp;</label>
                    {props?.info?.passingYear}
                  </p>
                )}
                {edit && (
                  <TextField
                    id="outlined-required"
                    label="Passing Year"
                    type="text"
                    name="passingYear"
                    defaultValue={props?.info?.passingYear}
                    onChange={props?.handleChange}
                  />
                )}
              </div>
            )}
            {(key === 1 || key === 2) && (
              <div className={styles.threeColLast}>
                {!edit && (
                  <p>
                    <label>Score:&nbsp;&nbsp;</label>
                    {props?.info?.score}
                  </p>
                )}
                {edit && (
                  <TextField
                    id="outlined-required"
                    label="Score"
                    type="text"
                    name="score"
                    defaultValue={props?.info?.score}
                    onChange={props?.handleChange}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <CustAlert
        open={alertOpen}
        onClose={handleAlertClose}
        severity={severity}
        message={message}
      />
    </Box>
  );
};

export default EduCard;
