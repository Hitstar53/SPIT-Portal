import React, { useState, useEffect } from "react";
import styles from "./Activities.module.css";
import CommitteeWorkCard from "./CommitteeWorkCard";
import VolunteerWork from "./VolunteerWork";
import CustAlert from "../../UI/CustAlert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import logo from "../../../assets/user.svg";
import AddButton from "../../UI/AddButton.jsx";
import MultiFieldModal from "../../UI/Modals/MultiFieldModal";
import TextField from "@mui/material/TextField";
import { json, useLoaderData, useNavigate } from "react-router-dom";

const cominfo = [
  {
    comlogo: logo,
    comname: "Computer Society of India (C.S.I. S.P.I.T.)",
    compos: "Technical Head",
    comyear: "2022-23",
  },
  {
    comlogo: logo,
    comname: "Oculus S.P.I.T.",
    compos: "Technical Head",
    comyear: "2021-22",
  },
  {
    comlogo: logo,
    comname: "Entrepreneurship Cell (E.Cell S.P.I.T.)",
    compos: "Technical Head",
    comyear: "2021-22",
  },
];

const volinfo = [
  {
    volname: "Abhyudaya",
    instructor: "Dr. Y.S. Rao",
    desc: "Teaching underprivedgled school students.",
    voldur: "30 hrs, 2023",
  },
  {
    volname: "Abhyudaya",
    instructor: "Dr. Y.S. Rao",
    desc: "Teaching underprivedgled school students.",
    voldur: "30 hrs, 2023",
  },
  {
    volname: "Abhyudaya",
    instructor: "Dr. Y.S. Rao",
    desc: "Teaching underprivedgled school students.",
    voldur: "30 hrs, 2023",
  },
];

function volCard(volinfo) {
  return (
    <VolunteerWork
      volname={volinfo.volname}
      instructor={volinfo.instructor}
      desc={volinfo.desc}
      voldur={volinfo.voldur}
    />
  );
}

const Activities = () => {
  const data = useLoaderData();
  const [committeeWork, setCommitteeWork] = useState(
    data.comData.committee ? data.comData.committee : []
  );
  const [volunteerWork, setVolunteerWork] = useState(
    data.volData.volunteerWork ? data.volData.volunteerWork : []
  );
  
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
    navigate(0);
  };
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  function handleClickOpen(index) {
    setIndex(index);
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleCommitteeChange = async () => {
    const arr = [...committeeWork];
    arr.splice(index, 1);
    const deleteCommittee = async () => {
      const response = await fetch(
        "http://localhost:8000/api/student/deleteYourCommittee",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("userinfo")).email,
            committee: arr,
          }),
        }
      );
      if (!response.ok) {
        setAlertOpen(true);
        setSeverity("error");
        setMessage("Something went wrong, please try again later");
      }
      if (response.ok) {
        const data = await response.json();
        setAlertOpen(true);
        setSeverity("success");
        setMessage("Project deleted successfully");
      }
    };
    deleteCommittee();
    setOpen(false);
  };

  const handleChangeVolunteer = (e) => {
    setVolunteerWork({ ...volunteerWork, [e.target.name]: e.target.value });
  };
  
  const handleChangeCommittee = (e) => {
    setCommitteeWork({ ...committeeWork, [e.target.name]: e.target.value });
  };
  const [coms, setCom] = useState(cominfo);
  const [openComDialog, setOpenComDialog] = useState(false);
  const handleComClickOpenDialog = () => {
    setOpenComDialog(true);
  };
  const handleComCloseDialog = () => {
    setOpenComDialog(false);
  };
  
  const [newComData, setNewComData] = useState({});
  const handleComDataChange = (e) => {
    setNewComData({ ...newComData, [e.target.name]: e.target.value });
  };
  const handleComSubmit = (e) => {
    e.preventDefault();
    const arr = [...coms];
    arr.unshift(newComData);
    setCom(arr);
    const updateParticipation = async () => {
      const response = await fetch(
        "http://localhost:8000/api/student/setParticipation",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("userinfo")).email,
            eventName: newEventData.eventname,
            date: newEventData.eventdate,
            organization: newEventData.orgname,
            description: newEventData.description,
          }),
        }
      );
      
      if (!response.ok) {
        setAlertOpen(true);
        setSeverity("error");
        setMessage("Something went wrong, please try again later");
      }
      if (response.ok) {
        const data = await response.json();
        setAlertOpen(true);
        setSeverity("success");
        setMessage("Project added successfully");
      }
    };
    updateParticipation();
    setOpen(false);
  };
  const [openVolDialog, setOpenVolDialog] = useState(false);
  const handleVolClickOpenDialog = () => {
    setOpenVolDialog(true);
  };
  const handleVolCloseDialog = () => {
    setOpenVolDialog(false);
  };
  const [newVolData, setNewVolData] = useState({});
  const handleVolDataChange = (e) => {
    setNewVolData({ ...newVolData, [e.target.name]: e.target.value });
  };
  const handleVolSubmit = (e) => {
    e.preventDefault();
    const arr = [...vols];
    arr.unshift(newVolData);
    const updateVolunteerWork = async () => {
      const response = await fetch(
        "http://localhost:8000/api/student/setVolunteerWork",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("userinfo")).email,
            volname : newVolData.volname,
            instructor : newVolData.instructor,
            desc : newVolData.desc,
            voldur : newVolData.voldurr
          }),
        }
      );
      
      if (!response.ok) {
        setAlertOpen(true);
        setSeverity("error");
        setMessage("Something went wrong, please try again later");
      }
      if (response.ok) {
        const data = await response.json();
        setAlertOpen(true);
        setSeverity("success");
        setMessage("Event added successfully");
      }
    };
    updateVolunteerWork();
    setOpen(false);
  };
  

  return (
    <div className={styles.activitiesPage}>
      <div className={styles.committees}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Committee Work</h1>
          <div>
            <AddButton
              btntext="Add Committee Work"
              onClick={handleComClickOpenDialog}
            />
          </div>
        </div>
        <div className={styles.comGrid}>
          {committeeWork.map((com, index) => (
            <CommitteeWorkCard
              key={index}
              comlogo={com.comlogo}
              comname={com.comname}
              compos={com.compos}
              comyear={com.comyear}
            />
          ))}
          <MultiFieldModal
            handleDataSubmit={handleComSubmit}
            openDialog={openComDialog}
            handleClickOpenDialog={handleComClickOpenDialog}
            handleCloseDialog={handleComCloseDialog}
            title="Add new Committee Work"
          >
            <TextField
              required
              autoFocus
              margin="dense"
              name="comname"
              label="Committee Name"
              autoComplete="off"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleComDataChange}
            />
            <TextField
              required
              margin="dense"
              name="compos"
              label="Position"
              autoComplete="off"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleComDataChange}
            />
            <TextField
              required
              margin="dense"
              name="comyear"
              label="Year of Tenure"
              autoComplete="off"
              type="text"
              fullWidth
              variant="standard"
              helperText="e.g. 2019-2020"
              onChange={handleComDataChange}
            />
          </MultiFieldModal>
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.volunteer}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Volunteer Work</h1>
          <div>
            <AddButton btntext="Add Work" onClick={handleVolClickOpenDialog} />
          </div>
        </div>
        <div className={styles.volGrid}>
          {volunteerWork.map((volinfo, index) => (
            <VolunteerWork
              key={index}
              volname={volinfo.volname}
              instructor={volinfo.instructor}
              desc={volinfo.desc}
              voldur={volinfo.voldur}
            />
          ))}
          <MultiFieldModal
            handleDataSubmit={handleVolSubmit}
            openDialog={openVolDialog}
            handleClickOpenDialog={handleVolClickOpenDialog}
            handleCloseDialog={handleVolCloseDialog}
            title="Add new volunteer work"
          >
            <TextField
              required
              autoFocus
              margin="dense"
              name="volname"
              label="Name"
              autoComplete="off"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleVolDataChange}
            />
            <TextField
              required
              margin="dense"
              name="voldur"
              label="duration"
              autoComplete="off"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleVolDataChange}
            />
            <TextField
              required
              margin="instructor"
              name="instructor"
              label="Instructor"
              autoComplete="off"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleVolDataChange}
            />
            <TextField
              required
              margin="desc"
              name="desc"
              label="description"
              autoComplete="off"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleVolDataChange}
            />
          </MultiFieldModal>
        </div>
      </div>
      <CustAlert
        open={alertOpen}
        onClose={handleAlertClose}
        severity={severity}
        message={message}
      />
    </div>
  );
};

export default Activities;

export async function loader() {
  const response1 = await fetch(
    "http://localhost:8000/api/student/getYourVolunteerWork",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: JSON.parse(localStorage.getItem("userinfo")).email,
      }),
    }
  );
  const response2 = await fetch(
    "http://localhost:8000/api/student/getYourCommittee",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: JSON.parse(localStorage.getItem("userinfo")).email,
      }),
    }
  );
  if(!response1.ok && !response2.ok) {
    throw json({ message: "Error fetching activity details"}, 422);
  }
  if (response1.ok && response2.ok) {
    const volData = await response1.json();
    const comData = await response2.json();
    console.log(volData);
    return { comData, volData };
  }
}