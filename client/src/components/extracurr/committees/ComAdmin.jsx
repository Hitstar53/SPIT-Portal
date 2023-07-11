import React, { useState } from "react";
import styles from "./ComAdmin.module.css";
import AddButton from "../../UI/AddButton.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import TextField from "@mui/material/TextField";
import AncmntCard from "./AncmntCard.jsx";
import AddEvent from "./AddEvent.jsx";
import { useNavigate, useParams } from "react-router-dom";
import MultiFieldModal from "../../UI/Modals/MultiFieldModal";
import { FaArrowLeft } from "react-icons/fa";

const announcement = [
  {
    title: "Change in venue for Pixel Paranoia",
    date: "24/10/23",
    ancmnt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
];

const eventData = [
  {
    date: "24/10/23",
    name: "Pixel Perfect",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

const members = [
  {
    name: "Aditya Kharote",
    pos: "Chairperson",
  },
  {
    name: "Siddhant Mesharam",
    pos: "Vice Chairperson",
  },
  {
    name: "Prathmesh Sharma",
    pos: "Vice Chairperson",
  },
];

const ComAdmin = () => {
  const params = useParams();
  const [events, setEvents] = useState(eventData);
  const [ancmnts, setAncmnts] = useState(announcement);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [openAncmntDialog, setOpenAncmntDialog] = useState(false);
  const handleEventClickOpenDialog = () => {
    setOpenEventDialog(true);
  };
  const handleEventCloseDialog = () => {
    setOpenEventDialog(false);
  };
  const handleAncmntClickOpenDialog = () => {
    setOpenAncmntDialog(true);
  };
  const handleAncmntCloseDialog = () => {
    setOpenAncmntDialog(false);
  };

  const [newEventData, setEventNewData] = useState({});
  const [newAncmntData, setAncmntNewData] = useState({});

  const handleEventDataChange = (e) => {
    setEventNewData({ ...newEventData, [e.target.name]: e.target.value });
  };
  const handleEventChangeDate = (event) => {
    setEventNewData({
      ...newEventData,
      date: dayjs(event).format("YYYY/MM/DD"),
    });
  };
  const handleEventSubmit = (e) => {
    e.preventDefault();
    const arr = [...events];
    arr.unshift(newEventData);
    setEvents(arr);
    setOpen(false);
  };

  const handleAncmntDataChange = (e) => {
    setAncmntNewData({ ...newAncmntData, [e.target.name]: e.target.value });
  };
  const handleAncmntChangeDate = (event) => {
    setAncmntNewData({
      ...newAncmntData,
      date: dayjs(event).format("YYYY/MM/DD"),
    });
  };
  const handleAncmntSubmit = (e) => {
    e.preventDefault();
    const arr = [...ancmnts];
    arr.unshift(newAncmntData);
    setAncmnts(arr);
    setOpen(false);
  };

  const container = styles.container + " flex flex-col gap-6 p-8";
  const navigate = useNavigate();
  return (
    <div className={container}>
      <h1 className="flex items-center gap-4 text-4xl font-semibold">
        <FaArrowLeft
          onClick={() => navigate(-1)}
          className="text-2xl cursor-pointer"
        />
        {params.comname}
      </h1>
      <div className="flex justify-between items-center text-2xl p-1 font-semibold">
        <h2>Announcements</h2>
        <AddButton onClick={handleAncmntClickOpenDialog} btntext="ADD" />
      </div>
      <div className={styles.card}>
        <div className={styles.inner}>
          {ancmnts.map((ancmnt, index) => (
            <AncmntCard
              key={index}
              title={ancmnt.title}
              date={ancmnt.date}
              ancmnt={ancmnt.ancmnt}
            />
          ))}
        </div>
      </div>
      <MultiFieldModal
        handleDataSubmit={handleAncmntSubmit}
        openDialog={openAncmntDialog}
        handleClickOpenDialog={handleAncmntClickOpenDialog}
        handleCloseDialog={handleAncmntCloseDialog}
        title="Add new announcement"
      >
        <TextField
          required
          autoFocus
          margin="dense"
          name="title"
          label="Title"
          autoComplete="off"
          type="text"
          fullWidth
          variant="standard"
          helperText="Title of the announcement"
          onChange={handleAncmntDataChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            required
            margin="dense"
            fullWidth
            name="date"
            label="Date"
            variant="standard"
            format="DD/MM/YYYY"
            onChange={handleAncmntChangeDate}
          />
        </LocalizationProvider>
        <TextField
          required
          margin="dense"
          name="ancmnt"
          label="Announcement"
          autoComplete="off"
          type="text"
          fullWidth
          variant="standard"
          helperText="What is the announcement?"
          onChange={handleAncmntDataChange}
        />
      </MultiFieldModal>
      <hr className={styles.divider} />
      <div className="flex justify-between items-center text-2xl p-1 font-semibold">
        <h2>Committee Events</h2>
        <AddButton onClick={handleEventClickOpenDialog} btntext="ADD" />
      </div>
      <div>
        {events.map((event, index) => (
          <AddEvent
            key={index}
            date={event.date}
            name={event.name}
            description={event.description}
          />
        ))}
      </div>
      <hr className={styles.divider} />
      <h2 className="text-2xl p-1 font-semibold">Core Members</h2>
      <div className={styles.tableHeader}>
        <h3>Name</h3>
        <h3>Position</h3>
      </div>
      <hr className={styles.divider} />
      {members.map((member, index) => (
        <div className={styles.cols}>
          <h3>{member.name}</h3>
          <h3>{member.pos}</h3>
        </div>
      ))}
      <MultiFieldModal
        handleDataSubmit={handleEventSubmit}
        openDialog={openEventDialog}
        handleClickOpenDialog={handleEventClickOpenDialog}
        handleCloseDialog={handleEventCloseDialog}
        title="Add new event"
      >
        <TextField
          required
          autoFocus
          margin="dense"
          name="name"
          label="Event Name"
          autoComplete="off"
          type="text"
          fullWidth
          variant="standard"
          helperText="Name of the event"
          onChange={handleEventDataChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            required
            margin="dense"
            fullWidth
            name="date"
            label="Date"
            variant="standard"
            format="DD/MM/YYYY"
            helperText="Date of the event"
            onChange={handleEventChangeDate}
          />
        </LocalizationProvider>
        <TextField
          required
          margin="dense"
          name="description"
          label="Description"
          autoComplete="off"
          type="text"
          fullWidth
          variant="standard"
          helperText="Short Description of the event"
          onChange={handleEventDataChange}
        />
      </MultiFieldModal>
    </div>
  );
};

export default ComAdmin;
