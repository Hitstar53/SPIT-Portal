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
import AddButton from "../../UI/AddButton.jsx";
import MultiFieldModal from "../../UI/Modals/MultiFieldModal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { json, useLoaderData, useNavigate,useRouteLoaderData } from "react-router-dom";
import ServerUrl from "../../../constants";

const Activities = () => {
  const data = useLoaderData();
  const comNames = data.comNames;
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
  const [volOpen, setVolOpen] = React.useState(false);
  const [comOpen, setComOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  function handleVolClickOpen(index) {
    setIndex(index);
    setVolOpen(true);
  }
  function handleComClickOpen(index) {
    setIndex(index);
    setComOpen(true);
  }
  const handleVolClose = () => {
    setVolOpen(false);
  };
  const handleComClose = () => {
    setComOpen(false);
  };
  const handleComChange = async () => {
    const arr = [...committeeWork];
    arr.splice(index, 1);
    const deleteCommittee = async () => {
      const response = await fetch(
        `${ServerUrl}/api/student/deleteYourCommittee`,
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
        setMessage("Committee Work deleted successfully");
      }
    };
    deleteCommittee();
    setComOpen(false);
  };
  const handleVolChange = async () => {
    const arr = [...volunteerWork];
    arr.splice(index, 1);
    const deleteVolunteerWork = async () => {
      const response = await fetch(
        `${ServerUrl}/api/student/deleteYourVolunteerWork`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("userinfo")).email,
            volunteerWork: arr,
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
        setMessage("Volunteer Work deleted successfully");
      }
    };
    deleteVolunteerWork();
    setVolOpen(false);
  };
  
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
    const arr = [...volunteerWork];
    arr.unshift(newVolData);
    const updateVolunteerWork = async () => {
      const response = await fetch(
        `${ServerUrl}/api/student/setVolunteerWork`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("userinfo")).email,
            eventName: newVolData.volname,
            date: newVolData.voldur,
            organization: newVolData.instructor,
            description: newVolData.desc
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
        setMessage("Activity added successfully");
      }
    };
    updateVolunteerWork();
    setVolOpen(false);
  };

  const handleComSubmit = (e) => {
    e.preventDefault();
    const arr = [...committeeWork];
    arr.unshift(newComData);
    const updateCommitteeWork = async () => {
      const response = await fetch(
        `${ServerUrl}/api/student/setYourCommittee`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("userinfo")).email,
            committeeDetails: newComData.comname,
            tenure:newComData.comyear,
            position:newComData.compos
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
        setMessage("Committee Work added successfully");
      }
    };
    updateCommitteeWork();
    setComOpen(false);
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
          {committeeWork.map((cominfo, index) => (
            <CommitteeWorkCard
              key={index}
              comname={cominfo.committeeDetails}
              compos={cominfo.position}
              comyear={cominfo.tenure}
              handleDelete={() => handleComClickOpen(index)}
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
              select
              fullWidth
              sx={{ margin: "1rem 0 0 0" }}
              variant="standard"
              onChange={handleComDataChange}
            >
              {comNames.map((option, index) => (
                <MenuItem key={index} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
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
              label="Tenure"
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
              volname={volinfo.eventName}
              instructor={volinfo.organization}
              desc={volinfo.description}
              voldur={volinfo.date}
              handleDelete={() => handleVolClickOpen(index)}
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
      <Dialog
        open={volOpen}
        onClose={handleVolClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{ background: "var(--bg-color)", pb: 0 }}>
          <DialogContentText
            sx={{ color: "var(--text-color)" }}
            id="alert-dialog-description"
          >
            Do you want to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ background: "var(--bg-color)", color: "var(--text-color)" }}
        >
          <Button sx={{ color: "var(--text-color)" }} onClick={handleVolClose}>
            No
          </Button>
          <Button sx={{ color: "var(--text-color)" }} onClick={handleVolChange}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={comOpen}
        onClose={handleComClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{ background: "var(--bg-color)", pb: 0 }}>
          <DialogContentText
            sx={{ color: "var(--text-color)" }}
            id="alert-dialog-description"
          >
            Do you want to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ background: "var(--bg-color)", color: "var(--text-color)" }}
        >
          <Button sx={{ color: "var(--text-color)" }} onClick={handleComClose}>
            No
          </Button>
          <Button sx={{ color: "var(--text-color)" }} onClick={handleComChange}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
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
    `${ServerUrl}/api/student/getYourVolunteerWork`,
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
    `${ServerUrl}/api/student/getYourCommittee`,
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
  const response3 = await fetch(
    `${ServerUrl}/api/student/getCommitteeNames`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if(!response1.ok && !response2.ok && !response3.ok) {
    throw json({ message: "Error fetching activity details"}, 422);
  }
  if (response1.ok && response2.ok && response3.ok) {
    const volData = await response1.json();
    const comData = await response2.json();
    const comNames = await response3.json();
    return { comData, volData, comNames };
  }
}