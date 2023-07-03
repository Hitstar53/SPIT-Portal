import React, { useState } from "react";
import {json, useNavigate, useParams, useLoaderData } from "react-router-dom";
import AddButton from "../../UI/AddButton"
import styles from "./Events.module.css";
import EventsCard from "./EventsCard.jsx";
import dayjs from "dayjs";
import CustAlert from "../../UI/CustAlert";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import MultiFieldModal from '../../UI/Modals/MultiFieldModal';
import TextField from '@mui/material/TextField';
import MenuItem  from '@mui/material/MenuItem';

const eventinfo = [
  {
    eventname : "Business Case Study Competition",
    eventdate : "12/12/38",
    orgname : "S.P. Jain Institute of Management and Research",
    eventinfo: "A business case study competition is an exciting platform where aspiring entrepreneurs and business professionals can showcase their analytical and problem-solving skills by presenting solutions to real-world business challenges."
  },
  {
    eventname : "TechFest",
    eventdate : "12/12/38",
    orgname : "Indian Institute of Technology, Bombay",
    eventinfo: "Techfest by IITB is an exhilarating annual techno-management festival organized by the Indian Institute of Technology Bombay, showcasing cutting-edge technological advancements and innovations."
  },
  {
    eventname : "Hackathon",
    eventdate : "12/12/38",
    orgname : "Michigan State University",
    eventinfo: "The hackathon at Michigan State University brings together students from diverse disciplines, fostering a collaborative environment for innovation and creativity in solving real-world challenges through technology."
  },
]

const Events = () => {
  const data = useLoaderData();
  const [events, setEvents] = useState(
    data.participation.map((event) => {
      return {
        eventname: event.eventName,
        eventdate: event.date,
        orgname: event.organization,
        description: event.description,
      };
    })
  );
  
  const [alertOpen, setAlertOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
  const handleChange = async () => {
    const arr = [...events];
    arr.splice(index, 1);
    const deleteEvent = async () => {
      const response = await fetch(
        "http://localhost:8000/api/student/deleteParticipation",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("userinfo")).email,
            participation: arr,
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
    deleteEvent();
    setOpen(false);
  };

  const [openEventDialog, setOpenEventDialog] = useState(false);
  const handleEventClickOpenDialog = () => {
    setOpenEventDialog(true);
  };
  const handleEventCloseDialog = () => {
    setOpenEventDialog(false);
  };
  
  const [newEventData, setEventNewData] = useState({});

  const handleEventDataChange = (e) => {
    setEventNewData({ ...newEventData, [e.target.name]: e.target.value });
  };

  const handleChangeDate = (event) => {
    setEventNewData({
      ...newEventData,
      "eventdate": `${event.$M + 1}/${event.$D}/${event.$y}`,
    });
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    const arr = [...events];
    arr.unshift(newEventData);
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
        setMessage("Event added successfully");
      }
    };
    updateParticipation();
    setOpen(false);
  };

  return (
    <div className={styles.eventsPage}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Your Participation</h1>
        <div>
          <AddButton onClick={handleEventClickOpenDialog} btntext="Add Event" />
        </div>
      </div>
      <div className={styles.comGrid}>
        {events.map((event, index) => {
          return (
            <EventsCard
              key={index}
              eventname={event.eventname}
              eventdate={event.eventdate}
              orgname={event.orgname}
              description={event.description}
              handleClickOpen={() => handleClickOpen(index)}
            />
          );
        })}
      </div>
      <MultiFieldModal
        handleDataSubmit={handleEventSubmit}
        openDialog={openEventDialog}
        handleClickOpenDialog={handleEventClickOpenDialog}
        handleCloseDialog={handleEventCloseDialog}
        title="Add new Event"
      >
        <TextField
          required
          autoFocus
          margin="dense"
          name="eventname"
          label="Event Name"
          autoComplete="off"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleEventDataChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            required
            margin="dense"
            fullWidth
            name="eventdate"
            label="Date"
            variant="standard"
            onChange={handleChangeDate}
          />
        </LocalizationProvider>
        <TextField
          required
          margin="dense"
          name="orgname"
          label="Organization"
          autoComplete="off"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleEventDataChange}
        />
        <TextField
          required
          margin="dense"
          name="description"
          label="Description"
          autoComplete="off"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleEventDataChange}
        />
      </MultiFieldModal>
      <Dialog
        open={open}
        onClose={handleClose}
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
          <Button sx={{ color: "var(--text-color)" }} onClick={handleClose}>
            No
          </Button>
          <Button sx={{ color: "var(--text-color)" }} onClick={handleChange}>
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

export default Events;

export async function loader() {
  const response = await fetch("http://localhost:8000/api/student/getParticipation", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: JSON.parse(localStorage.getItem("userinfo")).email,
    }),
  });
  if(!response.ok){
    throw json({message: "Error fetching participation details"}, 422)
  } else {
    const data = await response.json();
    return data
  }
}