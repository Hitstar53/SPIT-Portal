import React from "react";
import { Box } from "@mui/material";
import "../styles/ViewProfile.css";

const ViewProfile = () => {
  return (
    <div className="full-view">
      <div className="wrapper">
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
      <h1 className="bigger">Details</h1>
      <div className="info-wrapper-2">
        <section className="section">
          <h1 className="bigger">Personal</h1>
          <div className="info-wrapper">
            <h1 className="big">Date of Birth : 01/01/2000</h1>
            <h1 className="big">Date of Joining : 01/02/2022</h1>
            <h1 className="big">Gender : Male</h1>
            <h1 className="big">Blood Group : B+</h1>
            <h1 className="big">Type : Regular</h1>
          </div>
        </section>
        <section className="section">
          <h1 className="bigger">Contact</h1>
          <div className="info-wrapper">
            <h1 className="big">Email : shubham.more@spit.ac.in</h1>
            <h1 className="big">Phone No. : 9975508234</h1>
            <h1 className="big">
              Address : A/502, venice building, Mohak City, 90-Feet Road,
              Andheri west
            </h1>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ViewProfile;
