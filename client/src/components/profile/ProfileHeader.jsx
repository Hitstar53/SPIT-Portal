import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CustAlert from '../UI/CustAlert'
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from '@mui/material/colors';
import { LuEdit2 } from "react-icons/lu";
import styles from './ProfileHeader.module.css'
import ServerUrl from '../../constants';

const ProfileHeader = (props) => {
  const [profileInfo, setProfileInfo] = useState(props.info);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    navigate(0);
  };

  const handleFileUpload = async(e) =>{
    const file = e.target.files[0]
    const base64 = await convertToBase64(file);
    setProfileInfo((prev)=>({...prev,photo:base64}))
    const updateProfilePic = async () => {
      const response = await fetch(
        `${ServerUrl}/api/student/photo`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("userinfo")).email,
            photo:base64,
          }),
        }
      );
      if (!response.ok) {
        setOpen(true);
        setSeverity("error");
        setMessage("Something went wrong, please try again later");
      }
      if (response.ok) {
        const data = await response.json();
        setOpen(true);
        setSeverity("success");
        setMessage("Profile Photo Updated Successfully");
      }
    };
    updateProfilePic();
  }
  
  const [uid, setUid] = useState(profileInfo.uid);
  const [edit, setEdit] = useState(false);

  const handleClickEdit = () => {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  };

  const handleChange = (e) => {
    setUid(e.target.value);
  };
  
  return (
    <div className={styles.header}>
      <div className={styles.img}>
        <Avatar
          sx={{ width: 150, height: 150, bgcolor: deepOrange[500] }}
          alt={profileInfo.name}
          src={profileInfo.photo}
        />
        <div className={styles.edit}>
          <input
            type="file"
            id="profile_photo_input"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <LuEdit2
            onClick={() => {
              document.getElementById("profile_photo_input").click();
            }}
            className={styles.editIcon}
          />
        </div>
      </div>
      <div className={styles.title}>
        <h1> {profileInfo.name} </h1>
        <div className='flex gap-4 items-center'>
          {!edit && <h2> UID: {profileInfo.uid} </h2>}
          {edit && (
            <div>
              <TextField
                name="uid"
                id="outlined-required"
                label="uid"
                type="text"
                onChange={handleChange}
                defaultValue={profileInfo.uid}
              />
            </div>
          )}
          <LuEdit2
            onClick={handleClickEdit}
          />
        </div>
      </div>
      <CustAlert
        open={open}
        onClose={handleClose}
        severity={severity}
        message={message}
      />
    </div>
  );
}

function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () =>{
      resolve(fileReader.result);
    }
    fileReader.onerror = () =>{
      reject(error)
    }
  })
}

export default ProfileHeader