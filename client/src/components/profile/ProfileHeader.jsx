import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CustAlert from '../UI/CustAlert'
import { LuEdit2 } from "react-icons/lu";
import styles from './ProfileHeader.module.css'

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

  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  //   setName(userInfo?.name);
  //   if (userInfo?.photo) {
  //     setProfilePic(userInfo?.photo);
  //   } else {
  //     setProfilePic(profilePic);
  //   }
  // }, []);

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
  
  return (
    <div className={styles.header}>
      <div className={styles.img}>
        <img
          src={profileInfo?.photo}
          alt="profile photo"
          className={styles.profilePic}
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
        <h2> UID: {profileInfo.uid} </h2>
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