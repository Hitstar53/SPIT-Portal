import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "../styles/DeptAppraisal.css";
import { useContext } from "react";
import { UserContext } from '../context/UserContext';

// const facultyNames = ["CSE", "ECE", "EEE"];

export default function DeptAppraisal() {
    const { user } = useContext(UserContext);

    const [facultyName, setfacultyName] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/faculty/get/faculty/by-dept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        department: user.department,
      }),
    })
      .then((res) => res.json())
      .then((data) => setfacultyName(data));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("You clicked submit.");
    console.log(e.target[0].value);
  }
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
    </div>
  );
}
