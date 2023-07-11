import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "../styles/DeptAppraisal.css";
import { useContext } from "react";
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const Principal = () => {
    const { user } = useContext(UserContext);
    const [facultyName, setfacultyName] = useState([]);

  useEffect(() => {
    const getAllFaculty = async () => {
        axios.post("http://localhost:5000/api/faculty/get/faculty/all")
        .then((res) => {
            console.log(res.data)
            setfacultyName(res.data.sort());
        })
        .catch((err) => {
            console.log(err);
        })
    }
    getAllFaculty();
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
};

export default Principal;