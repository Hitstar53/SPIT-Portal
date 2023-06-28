import React,{useState} from 'react'
import { LuEdit2 } from "react-icons/lu";
import profile from "../../assets/user.svg";
import styles from './ProfileHeader.module.css'



const ProfileHeader = (props) => {
  const [profilePic, setProfilePic] = useState("")
  const handleFileUpload = async(e) =>{
    const file = e.target.files[0]
    const base64 = await convertToBase64(file);
    console.log(base64)
    setProfilePic(base64)
  }
    return (
      <div className={styles.header}>
        <div className={styles.img}>
            <img src={profilePic||props.info.picture} alt="profile photo" className={styles.profilePic} />
            <div className={styles.edit}>
              <input type="file" id="profile_photo_input" style={{display:"none"}} onChange={handleFileUpload}/>
              <LuEdit2 onClick={()=>{
                document.getElementById('profile_photo_input').click();
              }} className={styles.editIcon} />
            </div>
        </div>
        <div className={styles.title}>
          <h1> {props.info.name} </h1>
          <h2> UID: {props.info.uid} </h2>
        </div>
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