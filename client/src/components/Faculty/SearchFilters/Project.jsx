import React, { useState } from 'react'
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
    name: "F.E.",
    value: "FE",
  },
  {
    name: "S.E.",
    value: "SE",
  },
  {
    name: "T.E.",
    value: "TE",
  },
  {
    name: "B.E.",
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
    id: "project",
    numeric: false,
    label: "Project",
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
  const [newRows, setNewRows] = useState([]);
  const [newFilters, setNewFilters] = useState(filters);
  const onSearchSubmit = (data) => {
    console.log(data);
    setNewFilters(filters);
  };
  const onFilterSubmit = (filterData) => {
    setNewFilters(filters);
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
        setNewRows(data);
      }
    };
    setProject();
  };
  return (
    <div className={container}>
      <div className="flex justify-between items-center text-4xl font-semibold">
        <p>Project Based Student Search</p>
        <Search onSubmit={onSearchSubmit} />
      </div>
      <Filter
        options={options}
        filters={filters}
        onSubmit={onFilterSubmit}
      />
      <div className="mt-6">
        <CustTable rows={newRows} headCells={headCells}  />
      </div>
    </div>
  );
}

export default Project