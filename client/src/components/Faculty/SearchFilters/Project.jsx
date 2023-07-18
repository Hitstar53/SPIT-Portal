import React, { useState } from 'react'
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CustTable from '../../UI/CustTable'
import Search from './Search'
import Filter from './Filter'
import styles from './FilterLayout.module.css'
import ServerUrl from '../../../constants'

const rows = [
  {
    uid: 2021300108,
    studentname: "Hatim Sawai",
    email: "hatim.sawai@spit.ac.in",
    project: "Attendance Management System",
    domain: "Computer Vision",
    techstack: "Python, OpenCV",
  },
  {
    uid: 2021300109,
    studentname: "Kaif Sayyed",
    email: "kaif.sayyed@spit.ac.in",
    project: "Health App",
    domain: "App Development",
    techstack: "Flutter, Firebase",
  },
]

const filters = [
  {
    id: "domain",
    label: "Domain",
  },
  {
    id: "techstack",
    label: "Tech Stack",
  },
]

const options = [
  {
    name: "All",
    value: "All",
  },
  {
    name: "FE",
    value: "FE",
  },
  {
    name: "SE",
    value: "SE",
  },
  {
    name: "TE",
    value: "TE",
  },
  {
    name: "BE",
    value: "BE",
  }
]

const headCells = [
  {
    id: "uid",
    numeric: true,
    label: "UID",
  },
  {
    id: "studentname",
    numeric: false,
    label: "Student Name",
  },
  {
    id: "email",
    numeric: false,
    label: "Email",
  },
  {
    id: "type",
    numeric: false,
    label: "Type",
  },
  {
    id: "title",
    numeric: false,
    label: "Title",
  },
  {
    id: "domain",
    numeric: false,
    label: "Domain",
  },
  {
    id: "techstack",
    numeric: false,
    label: "TechStack",
  },
];


const Project = () => {
  const container = styles.container + " flex flex-col gap-8 p-8";
  const [isLoading, setIsLoading] = useState(false);
  const [newRows, setNewRows] = useState([]);
  const [newFilters, setNewFilters] = useState(filters);
  const onSearchSubmit = (data) => {
    console.log(data);
    setNewFilters(filters);
  };
  const onFilterSubmit = (filterData) => {
    setNewFilters(filters);
    setIsLoading(true);
    const setProject = async () => {
      const response = await fetch(
        `${ServerUrl}/api/faculty/getProjectsInfo`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            year: filterData.type === "All" ? "" : filterData.type,
            domain: filterData.domain ? ".*"+filterData.domain.split("").join(".*")+".*" : undefined,
            techStack: filterData.techstack ? ".*"+filterData.techstack.split("").join(".*")+".*" : undefined,
          }),
        }
      );
      if (!response.ok) {
        console.log("Something went wrong, please try again later");
      }
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setNewRows(data);
      }
      setIsLoading(false);
    };
    setProject();
  };
  return (
    <div className={container}>
      <div className="flex justify-between items-center text-4xl font-semibold">
        <p>Project Based Student Search</p>
        <Search onSubmit={onSearchSubmit} />
      </div>
      <Filter options={options} filters={filters} onSubmit={onFilterSubmit} />
      {isLoading ? (
        <Backdrop
          sx={{
            color: "#fff",
            marginLeft: open ? "240px" : "0px",
            marginTop: "64px",
          }}
          open={true}
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <CircularProgress color="inherit" />
            Have patience, we are loading your data...
          </div>
        </Backdrop>
      ) : (
        <div className="mt-6">
          <CustTable rows={newRows} headCells={headCells} />
        </div>
      )}
    </div>
  );
}

export default Project