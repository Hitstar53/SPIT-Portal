import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CustTable from "../../UI/CustTable";
import Filter from "./Filter";
import ServerUrl from "../../../constants";
import styles from "./FilterLayout.module.css";

const rows = [
  {
    uid: 2021300108,
    name: "Hatim Sawai",
    email: "hatim.sawai@spit.ac.in",
    branch: "Computer Engineering",
    committee: "Oculus Coding League",
    event: "S.E. Hackathon, IPL Auction",
  },
  {
    uid: 2021300109,
    name: "Kaif Sayyed",
    email: "kaif.sayyed@spit.ac.in",
    branch: "Computer Engineering",
    committee: "",
    event: "Pitch Perfect",
  },
];

const filters = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "committee",
    label: "Committee",
  },

];

const options = [
  {
    name: "Winner",
    value: "Winner",
  },
  {
    name: "First Runner Up",
    value: "2nd Place",
  },
  {
    name: "Second Runner Up",
    value: "3rd Place",
  },
  {
    name: "Participation",
    value: "participation",
  },
  {
    name: "Others",
    value: "others",
  },
];

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
    id: "committee",
    numeric: false,
    label: "Committee",
  },
  {
    id: "event",
    numeric: false,
    label: "Events",
  },
];

const ExtraCurr = () => {
  const container = styles.container + " flex flex-col gap-8 p-8";
  const [isLoading, setIsLoading] = useState(false);
  const [newRows, setNewRows] = useState([]);
  const onFilterSubmit = (filterData) => {
    setIsLoading(true);
    const setInfo = async () => {
      const response = await fetch(`${ServerUrl}/api/faculty/getExtra`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type:filterData.type,
          name:filterData.name,
          committee:filterData.committee
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
        <p>Extra Curriculars Student Search</p>
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
};

export default ExtraCurr;
