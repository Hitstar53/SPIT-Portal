import React from "react";
import { Box } from "@mui/material";
import "../styles/ViewProfile.css";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WcIcon from '@mui/icons-material/Wc';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import MergeTypeIcon from '@mui/icons-material/MergeType';

const ViewProfile = () => {
  return (
    <div className="full-view">
      <div className="profile-wrapper">
        <div className="img-wrapper">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="profile"
          />
        </div>
        <div className="info-wrapper">
          <h1 className="bigger">Name : Shubham Ramdas More</h1>
          <h1 className="big">Designation : Assistant Professor</h1>
          <h1 className="big">Department : Computer Engineering</h1>
          <h1 className="big">ID : 2021300079</h1>
        </div>
      </div>
      <hr />
      <section>
        <h1 className="bigger">Details :</h1>
        <div className="info-wrapper-2">
          <div className="section">
            <h1 className="bigger">Personal</h1>
            <div className="info-wrapper">
              <h1 className="bigg"><CalendarMonthIcon sx={{marginRight:2.5,marginTop:.2}}/>Date of Birth : 01/01/2000</h1>
              <h1 className="bigg"><CalendarTodayIcon sx={{marginRight:2.5,marginTop:.2}}/>Date of Joining : 01/02/2022</h1>
              <h1 className="bigg"><WcIcon sx={{marginRight:2.5,marginTop:.2}}/>Gender : Male</h1>
              <h1 className="bigg"><BloodtypeIcon sx={{marginRight:2.5,marginTop:.2}}/>Blood Group : B+</h1>
              <h1 className="bigg"><MergeTypeIcon sx={{marginRight:2.5,marginTop:.2}}/>Type : Regular</h1>
            </div>
          </div>
          <div className="section" id="section-2">
            <h1 className="bigger">Contact</h1>
            <div className="info-wrapper">
              <h1 className="bigg"><EmailIcon sx={{marginRight:2.5,marginTop:.2}}/>Email : shubham.more@spit.ac.in</h1>
              <h1 className="bigg"><PhoneIcon sx={{marginRight:2.5,marginTop:.2}}/>Phone No. : 9975508234</h1>
              <h1 className="bigg">
              <BusinessIcon sx={{marginRight:2.5,marginTop:.2}}/>
                Address : A/502, venice building, Mohak City, 90-Feet Road,
                Andheri west
              </h1>
              <h1 className="bigg"><GitHubIcon sx={{marginRight:2.5,marginTop:.2}}/>GitHub : Shubhamore</h1>
            <h1 className="bigg"><LinkedInIcon sx={{marginRight:2.5,marginTop:.2}}/>LinkedIn : Shubhamore</h1>
            </div>
          </div>
        </div>
      </section>

      <hr />
      <section>
        <h1 className="bigger">Academics :</h1>
        <div className="section" id="section-3">
          <h1 className="bigg">Qualification: B.Tech, 12th</h1>
          <h1 className="bigg">Specialisation: AI, ML, NLP, Big Data</h1>
          <h1 className="bigg">Class Incharge: S.E. Computer Engineering B</h1>

        </div>
      </section>
    </div>
  );
};

export default ViewProfile;
