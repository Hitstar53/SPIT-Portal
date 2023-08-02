import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "../styles/DeptAppraisal.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import StepFour from "../components/StepFour";
import NotFound from "../assets/404-not-found.png";
import SelectFaculty from "../assets/select-faculty.png";
import Done from "../assets/done.png";

// const facultyNames = ["CSE", "ECE", "EEE"];
var yr = getDate();
function getDate() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  console.log(month);
  console.log(year);
  console.log(day);
  // if(month<6)
  return `${year}-${year + 1}`;
  // else
  // return `${year+1}-${year+2}`
}

export default function DeptAppraisal() {
  const [status, setStatus] = useState("Not searched");
  const { user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [facultyName, setfacultyName] = useState([]);
  if (user.designation !== "HOD") {
    window.location.href = "/home";
  }
  useEffect(() => {
    fetch("http://localhost:5000/api/faculty/get/faculty/by-dept-hod", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        department: user.department,
        yearofAssesment: yr,
      }),
    })
      .then((res) => res.json())
      .then((data) => setfacultyName(data.sort()));
  }, []);

  async function checkFaculty(name) {
    await fetch("http://localhost:5000/api/faculty/get/faculty/check-faculty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        year: yr,
      }),
    }).then((res) => {
      if (res.status === 200) setStatus("Faculty found");
      else if (res.status === 404) setStatus("Faculty not found");
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setName(e.target[0].value);
    checkFaculty(e.target[0].value);
  }
  useEffect(() => {
    console.log(name);
  }, [name]);

  useEffect(() => {
    console.log(status);
  }, [status]);

  return (
    <div className="dept-appraisal">
      <form onSubmit={handleSubmit}>
        <div className="dept-appraisal-header">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={facultyName}
            sx={{ width: 300, display: "inline-block" }}
            renderInput={(params) => (
              <TextField {...params} label="Faculty Name" />
            )}
          />
          <button type="submit" className="find-faculty-btn">
            Find Faculty
          </button>
        </div>
      </form>
      <div className="dept-appraisal-body">
        {status === "Faculty found" && (
          <StepFour yr={yr} fullName={name} setStatus={setStatus} />
        )}
        {status === "Step Four Saved" && (
          <div className="dept-appraisal-vertical">
            <h1>{name}'s Appraisal has been Accepted</h1>
            <img src={Done} alt="not found" />
          </div>
        )}
        {status === "Not searched" && (
          <div className="dept-appraisal-vertical">
            <h1>Select Faculty Name To Enter Their Marks</h1>
            <img src={SelectFaculty} alt="not found" />
          </div>
        )}
        {status === "Faculty not found" && (
          <div className="dept-appraisal-vertical">
            <h1>
              {name} not found in {user.department} department
            </h1>
            <img src={NotFound} alt="not found" />
          </div>
        )}
        {status === "Appraisal Rejected" && (
          <div className="dept-appraisal-vertical">
            <h1>
              {name}'s Appraisal has been rejected
            </h1>
            <img src={Done} alt="not found" />
          </div>
        )}
      </div>
    </div>
  );
}
