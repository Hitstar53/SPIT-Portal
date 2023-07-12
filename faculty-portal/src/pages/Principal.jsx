import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "../styles/DeptAppraisal.css";
import { useContext } from "react";
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Report from "../components/Report";
import "../styles/Principal.css"

const Principal = () => {
    const { user } = useContext(UserContext);
    const [name, setName] = useState("");
    const [status,setStatus]=useState("Not searched");
    let report = null;
    const [facultyName, setfacultyName] = useState([]);
    const [facultyData , setfacultyData] = useState([]);

    function getDate() {
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      const day = new Date().getDate();
      // console.log(month);
      // console.log(year);
      // console.log(day);
      // if(month<6)
      return `${year}-${year + 1}`;
      // else
      // return `${year+1}-${year+2}`
    }
    
    var yr = getDate();
    

  useEffect(() => {
    const getAllFaculty = async () => {
        axios.post("http://localhost:5000/api/faculty/get/faculty/all-principal", { year: yr })
        .then((res) => {
            // console.log(res.data)
            setfacultyName(res.data.sort());
        })
        .catch((err) => {
            console.log(err);
        })
    }
    getAllFaculty();
  }, []);

  const viewReport = async (faculty) => {
    await axios.post("http://localhost:5000/api/faculty/get/faculty/check-principal-faculty", {
        name: faculty,
        year: yr,
      })
      .then((res) => {
        console.log(res.data);
        console.log(res.status)
        if(res.status===200) {
          setStatus("Faculty found")
          setfacultyData(res.data);
        }
        else {
          setStatus("Faculty not found")
        }
      })
      .catch((err) => {
        setStatus("Faculty not found")
        console.log(err);
      })

  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("You clicked submit.");
    setName(e.target[0].value);
    console.log(e.target[0].value);
    viewReport(e.target[0].value);
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
      <div>
      <div className="dept-appraisal-body">
        {status==="Not searched"&&<h1>Click on Find Faculty to Enter their marks</h1>}
        {status==="Faculty found"&&<h1><Report facultyData={facultyData} name={name}/></h1>}
        {status==="Faculty not found"&&<h1>Faculty not found</h1>}
      </div>
      </div>
    </div>
  );
};

export default Principal;