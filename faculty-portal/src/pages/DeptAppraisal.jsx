import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "../styles/DeptAppraisal.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

// const facultyNames = ["CSE", "ECE", "EEE"];
var yr=getDate()
  function getDate() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    console.log(month);
    console.log(year);
    console.log(day);
    // if(month<6)
    return `${year}-${year+1}`
    // else
    // return `${year+1}-${year+2}`
  }

export default function DeptAppraisal() {
  const { user } = useContext(UserContext);
    const [name,setName]=useState("")
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
    setName(e.target[0].value)
    console.log("You clicked submit.");
    console.log(e.target[0].value);
    fetch("http://localhost:5000/api/faculty/get/faculty/check-faculty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        year:yr,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
