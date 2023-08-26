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
import { API_URL } from '../config';

export default function DeptAppraisal() {
  const [status, setStatus] = useState("Not searched");
  const { user, yr } = useContext(UserContext);
  const [name, setName] = useState("");
  const [facultyName, setfacultyName] = useState([]);
  if (user.designation !== "HOD") {
    window.location.href = "/home";
  }
  useEffect(() => {
    fetch(API_URL + "/api/faculty/get/faculty/by-dept-hod", {
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
    await fetch(API_URL + "/api/faculty/get/faculty/check-faculty", {
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

  }, [name]);

  useEffect(() => {

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
              {name}'s Appraisal has been resended
            </h1>
            <img src={Done} alt="not found" />
          </div>
        )}
      </div>
    </div>
  );
}
