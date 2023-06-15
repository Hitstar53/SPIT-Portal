import * as React from "react";
import profile from "../../assets/user.svg";

const Profile = () => {
  return (
    <body style={{margin: 30}}>
    <div style={{display:"flex", flexDirection:"row", backgroundColor: "red", gap: "1rem", alignItems: "center"}}>
      <img src={profile} alt="profile photo" style={{ width: 175, height: 175}} />
      <div>
        <h3 style={{fontSize: 40, fontWeight:600}}> Hatim Sawai </h3>
        <h6 style={{fontSize: 26, fontWeight:400}}> 2021300108 </h6>
      </div>
    </div>
    <h3 style={{marginTop: 40, marginBottom: 10, fontWeight: 600, fontSize: 24}}>Personal Information</h3>
    <div style={{fontSize: 22, display: "flex", flexDirection: "row", alignItems: "flex-start"}}>
      <div style={{width:"50%"}}> <i class="fas fa-phone"></i><span style={{marginLeft: 10}}>97690 95698</span> </div>
      <div><i class="fa-solid fa-envelope"></i><span style={{marginLeft: 10}}>hatim.sawai@spit.ac.in</span> </div>
    </div>
    </body>
  )
}

export default Profile