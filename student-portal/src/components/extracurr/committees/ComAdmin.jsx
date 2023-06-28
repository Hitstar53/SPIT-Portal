import React, { useState } from "react";
import styles from "./ComAdmin.module.css";
import AddButton from "../../UI/AddButton.jsx";
import TextField from "@mui/material/TextField";
import AncmntCard from "./AncmntCard.jsx";
import Members from "./Members.jsx";
import AddEvent from "./AddEvent.jsx";
import { useNavigate, useParams } from "react-router-dom";
import MultiFieldModal from "../../UI/Modals/MultiFieldModal";

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

function createMember(members) {
  return <Members name={members.name} pos={members.pos} />;
}

const ComAdmin = () => {
  const navigate = useNavigate();
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
  const handleAncmntSubmit = (e) => {
    e.preventDefault();
    const arr = [...ancmnts];
    arr.unshift(newAncmntData);
    setAncmnts(arr);
    setOpen(false);
  };

  return (
    <div className={styles.comAdminPage}>
      <h1 className={styles.heading}>{params.comname}</h1>
      <div className={styles.header}>
        <h2 className={styles.subheading}>Announcements</h2>
        <AddButton onClick={handleAncmntClickOpenDialog} btntext="ADD" />
      </div>
      {ancmnts.map((ancmnt,index) => (
        <AncmntCard
          key={index}
          title={ancmnt.title}
          date={ancmnt.date}
          ancmnt={ancmnt.ancmnt}
        />
      ))}
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
          onChange={handleAncmntDataChange}
        />
        <TextField
          required
          margin="dense"
          name="date"
          label="Date"
          autoComplete="off"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleAncmntDataChange}
        />
        <TextField
          required
          margin="dense"
          name="ancmnt"
          label="Announcement"
          autoComplete="off"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleAncmntDataChange}
        />
      </MultiFieldModal>
      <hr className={styles.divider} />
      <div className={styles.header}>
        <h2 className={styles.subheading}>Events</h2>
        <AddButton onClick={handleEventClickOpenDialog} btntext="ADD" />
      </div>
      {events.map((event,index) => (
        <AddEvent
          key={index}
          date={event.date}
          name={event.name}
          description={event.description}
        />
      ))}
      <hr className={styles.divider} />
      <h2 className={styles.subheading}>Members</h2>
      <div className={styles.tableHeader}>
        <h3>Name</h3>
        <h3>Position</h3>
      </div>
      <hr className={styles.divider} />
      {members.map(createMember)}
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
          onChange={handleEventDataChange}
        />
        <TextField
          required
          margin="dense"
          name="date"
          label="Event Date"
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
    </div>
  );
};

export default ComAdmin;
