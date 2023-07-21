import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "../styles/DeptAppraisal.css";
import { useContext } from "react";
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Report from "../components/Report";
import AllSteps from "../components/AllSteps";
import { IconButton } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SelectFaculty from "../assets/select-faculty.png";
import "../styles/Principal.css"

const Principal = () => {
  const { user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Not searched");
  const [allDept, setAllDept] = useState([]);
  const [selectedDept, setSelectedDept] = useState(false);
  const [facultyName, setfacultyName] = useState([]);
  const [facultyData, setfacultyData] = useState([]);
  const [backToTop, setBackToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (user.designation !== "Principal") {
    window.location.href = "/home";
  }

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
    const getDept = async () => {
      await axios.get("http://localhost:5000/api/faculty/get/faculty/getalldepartments")
        .then((res) => {
          console.log(res.data)
          setAllDept(res.data)
        })
        .catch((err) => console.log(err))
    }
    getDept()
  }, [])

  // useEffect(() => {
  //   const getAllFaculty = async () => {
  //       axios.post("http://localhost:5000/api/faculty/get/faculty/all-principal", { year: yr })
  //       .then((res) => {
  //           // console.log(res.data)
  //           setfacultyName(res.data.sort());
  //       })
  //       .catch((err) => {
  //           console.log(err);
  //       })
  //   }
  //   getAllFaculty();
  // }, []);

  const viewReport = async (faculty) => {
    await axios.post("http://localhost:5000/api/faculty/get/faculty/check-principal-faculty", {
      name: faculty,
      year: yr,
    })
      .then((res) => {
        console.log(res.data);
        console.log(res.status)
        if (res.status === 200) {
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

  var appraisalView = null


  const getPrincipalFaculty = async (dept) => {
    console.log(dept)
    await axios.post("http://localhost:5000/api/faculty/get/faculty/all-principal", {
      department: dept,
      year: yr
    })
      .then((res) => {
        console.log(res.data)
        setfacultyName(res.data.sort())
        setSelectedDept(true)
      })
      .catch((err) => {
        console.log(err)
        setfacultyName([])
        setSelectedDept(false)
      })
  }

  const handleDeptSubmit = (e) => {
    e.preventDefault();
    console.log("You clicked submit.");
    console.log(e.target[0].value);
    getPrincipalFaculty(e.target[0].value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("You clicked submit.");
    setName(e.target[0].value);
    console.log(e.target[0].value);
    viewReport(e.target[0].value);
    // appraisalView = <AllSteps fullName={name} year={yr} />
  }

  return (
    <div className="dept-appraisal">
      <div className="flex flex-col justify-center mt-6">
        <form className='flex items-center justify-center' onSubmit={handleDeptSubmit}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={allDept}
            sx={{ width: 300, display: "inline-block" }}
            renderInput={(params) => (
              <TextField {...params} label="Enter Department" />
            )}
          />
          <button type="submit" className="find-faculty-btn">
            View Faculty
          </button>
        </form>

       {selectedDept && (
         <form className='flex items-center justify-center mt-4' onSubmit={handleSubmit}>
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
       </form>
       )}
      </div>
      <div>
        <div>
          {appraisalView}
        </div>
        <div className="dept-appraisal-body">
          {status === "Not searched" &&
            <div className="flex flex-col items-center justify-center">
              <h2>Select Department and Faculty to View Appraisal Enter their marks</h2>
              <img src={SelectFaculty} alt="not found" width="500px" />
            </div>
          }
          {status === "Faculty found" &&
            <div style={{ marginTop: "-4rem" }}>
              <AllSteps fullName={name} year={yr} isPrincipal={true} forHOD={facultyData.designation==='HOD'} />
              <h1><Report facultyData={facultyData} name={name} forHOD={facultyData.designation==='HOD'}/>
              </h1>
            </div>}
          {status === "Faculty not found" && <h1>Faculty not found</h1>}
        </div>
      </div>
      <div>
        {backToTop && (
          <IconButton
            sx={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: "999" }}
            className="back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <ArrowUpwardIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default Principal;