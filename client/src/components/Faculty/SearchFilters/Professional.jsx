import React, { useState } from 'react'
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CustTable from '../../UI/CustTable'
import Filter from './Filter'
import ServerUrl from '../../../constants'
import styles from './FilterLayout.module.css'

const filters = [
  {
    id: "organization",
    label: "Organization",
  },
  {
    id: "ctc",
    label: "C.T.C.",
  },
]

const options = [
  {
    name: "All",
    value: "All",
  },
  {
    name: "Internship",
    value: "Internship",
  },
  {
    name: "Placement",
    value: "Placement",
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
    id: "Organization",
    numeric: false,
    label: "Organization",
  },
  {
    id: "ctc",
    numeric: true,
    label: "CTC (LPA)",
  },
];

const Professional = () => {
  const container = styles.container + " flex flex-col gap-8 p-8";
  const [isLoading, setIsLoading] = useState(false);
  const [newRows, setNewRows] = useState([]);
  const onFilterSubmit = (filterData) => {
    setIsLoading(true);
    const setProfessional = async () => {
      const response = await fetch(
        `${ServerUrl}/api/faculty/getProfessionalInfo`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: filterData.type,
            organization: filterData.organization,
            ctc: filterData.ctc,
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
    }
    setProfessional();  
  }
  return (
    <div className={container}>
      <div className="flex justify-between items-center text-4xl font-semibold">
        <p>Professional Student Search</p>
      </div>
      <Filter
        options={options}
        filters={filters}
        onSubmit={onFilterSubmit}
      />
      { isLoading ? (
        <Backdrop
          sx={{
            color: "#fff",
            marginLeft: open ? "240px" : "0px",
            marginTop: "64px",
          }}
          open={true}
        >
          <div className='flex flex-col items-center justify-center gap-3'>
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

export default Professional