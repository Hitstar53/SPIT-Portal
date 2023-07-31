import React, { useState } from 'react'
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CustTable from '../../UI/CustTable'
import InfoFilter from './InfoFilter'
import ServerUrl from '../../../constants'
import styles from './FilterLayout.module.css'

const rows = [
  {
    uid: 2021300108,
    name: "Hatim Sawai",
    email: "hatim.sawai@spit.ac.in",
    branch: "Computer Engineering",
    batch: "B",
    committee: "Oculus Coding League",
    event: "S.E. Hackathon, IPL Auction",
    cgpa: 9.5,
  },
  {
    uid: 2021300109,
    name: "Kaif Sayyed",
    email: "kaif.sayyed@spit.ac.in",
    branch: "Computer Engineering",
    batch: "B",
    committee: "",
    event: "Pitch Perfect",
    cgpa: 8.1,
  },
]

const filters = [
  {
    id: "cgpa",
    label: "CGPA",
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

const branchOptions = [
  { name: "All", value: "All" },
  { name: "Comps", value: "Comps" },
  { name: "AIML", value: "AIML" },
  { name: "DS", value: "DS" },
  { name: "CSE", value: "CSE" },
  { name: "EXTC", value: "EXTC" },
  { name: "ETRX", value: "ETRX" },
  { name: "IT", value: "IT" },
]

const batchOptions = [
  { name: "All", value: "All" },
  { name: "A", value: "A" },
  { name: "B", value: "B" },
  { name: "C", value: "C" },
  { name: "D", value: "D" },
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
    label: "Name",
  },
  {
    id: "email",
    numeric: false,
    label: "Email",
  },
  {
    id: "branch",
    numeric: false,
    label: "Branch",
  },
  {
    id: "batch",
    numeric: false,
    label: "Batch",
  },
  {
    id: "cgpa",
    numeric: true,
    label: "CGPA",
  },
  {
    id: "profile",
    numeric: false,
    label: "Profile",
  }
];


const Info = () => {
  const container = styles.container + " flex flex-col gap-8 p-8";
  const [isLoading, setIsLoading] = useState(false);
  const [newRows, setNewRows] = useState([]);
  const onFilterSubmit = (filterData) => {
    setNewFilters(filters);
    setIsLoading(true);
    const setInfo = async () => {
      const response = await fetch(`${ServerUrl}/api/faculty/getInformation`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          year: filterData.type === "All" ? "" : filterData.type,
          branch: filterData.branch === "All" ? "" : filterData.branch,
          batch: filterData.batch === "All" ? "" : filterData.batch,
          cgpa: filterData.cgpa,
        }),
      });
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
    setInfo();
  };
  return (
    <div className={container}>
      <div className="flex justify-between items-center text-4xl font-semibold">
        <p>Student Info Search</p>
      </div>
      <InfoFilter
        options={options}
        branchOptions={branchOptions}
        batchOptions={batchOptions}
        filters={filters}
        onSubmit={onFilterSubmit}
      />
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

export default Info