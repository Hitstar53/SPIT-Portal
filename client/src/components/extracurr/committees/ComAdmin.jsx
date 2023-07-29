import React, { useState } from "react";
import styles from "./ComAdmin.module.css";
import CustAlert from "../../UI/CustAlert";
import AddButton from "../../UI/AddButton.jsx";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import TextField from "@mui/material/TextField";
import AncmntCard from "./AncmntCard.jsx";
import AddEvent from "./AddEvent.jsx";
import { useNavigate, useParams, useLoaderData, json } from "react-router-dom";
import MultiFieldModal from "../../UI/Modals/MultiFieldModal";
import { FaArrowLeft } from "react-icons/fa";
import ServerUrl from "../../../constants";

const ComAdmin = () => {
  const data = useLoaderData();
  const params = useParams();
  const [events, setEvents] = useState(data.eventData || []);
  const [ancmnts, setAncmnts] = useState(data.ancmntData || []);
  const [members, setMembers] = useState(data.comData.members || []);
  const [openCpDialog, setOpenCpDialog] = useState(false);
  const [openMemberDialog, setOpenMemberDialog] = useState(false);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [openAncmntDialog, setOpenAncmntDialog] = useState(false);
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
  const handleCpClickOpenDialog = () => {
    setOpenCpDialog(true);
  };
  const handleCpCloseDialog = () => {
    setOpenCpDialog(false);
  };
  const handleMemberClickOpenDialog = () => {
    setOpenMemberDialog(true);
  };
  const handleMemberCloseDialog = () => {
    setOpenMemberDialog(false);
  };
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
  const [newCpData, setCpNewData] = useState({});
  const [newMemberData, setMemberNewData] = useState({});
  const [newAncmntData, setAncmntNewData] = useState({});
  const [newEventData, setEventNewData] = useState({});
  const handleCpDataChange = (e) => {
    setCpNewData({ ...newCpData, [e.target.name]: e.target.value });
  };
  const handleCpSubmit = (e) => {
    e.preventDefault();
    const setCommitteeCp = async () => {
      const response = await fetch(`${ServerUrl}/api/student/makeNewCP`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cemail: JSON.parse(localStorage.getItem("userinfo")).email,
          nemail: newCpData.nemail,
          comname: params.comname,
        }),
      });
      if (!response.ok) {
        setAlertOpen(true);
        setSeverity("error");
        setMessage("Something went wrong, please try again later");
      }
      if (response.ok) {
        const data = await response.json();
        setAlertOpen(true);
        setSeverity("success");
        setMessage("Chairperson Changed successfully");
      }
    };
    setCommitteeCp();
  };
  const handleMemberDataChange = (e) => {
    setMemberNewData({ ...newMemberData, [e.target.name]: e.target.value });
  };
  const handleMemberSubmit = (e) => {
    e.preventDefault();
    const arr = [...members];
    arr.unshift(newMemberData);
    const updateMembers = async () => {
      const response = await fetch(
        `${ServerUrl}/api/student/setCommitteeDetails`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comname: params.comname,
            name: newMemberData.name,
            position: newMemberData.position,
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
        setMessage("Member added successfully");
      }
    };
    updateMembers();
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
    const arr = [...members];
    arr.splice(index, 1);
    const deleteMember = async () => {
      const response = await fetch(
        `${ServerUrl}/api/student/deleteCommitteeDetails`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            members: arr,
            comname: params.comname,
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
        setMessage("Member deleted successfully");
      }
    };
    deleteMember();
    setOpen(false);
  };

  const handleEventDataChange = (e) => {
    setEventNewData({ ...newEventData, [e.target.name]: e.target.value });
  };
  const handleEventChangeDate = (event) => {
    setEventNewData({
      ...newEventData,
      ["endDate"]: dayjs(event).format("YYYY/MM/DD"),
    });
  };
  const handleEventSubmit = (e) => {
    e.preventDefault();
    const arr = [...events];
    arr.unshift(newEventData);
    setEvents(arr);
    const setCommitteeEvents = async () => {
      try {
        const response = await fetch(
          `${ServerUrl}/api/student/setCommitteeEvents`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: JSON.parse(localStorage.getItem("userinfo")).email,
              name: newEventData.name,
              description: newEventData.description,
              endDate: newEventData.endDate,
              comname: params.comname,
            }),
          }
        );
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          setAlertOpen(true);
          setSeverity("success");
          setMessage("Announcement set successfully");
        } else {
          console.log("Error:", response.status);
          setAlertOpen(true);
          setSeverity("error");
          setMessage("Something went wrong, please try again later");
        }
      } catch (error) {
        console.log("Error:", error);
        setAlertOpen(true);
        setSeverity("error");
        setMessage("Something went wrong, please try again later");
      }
    };
    setCommitteeEvents();
    setOpenEventDialog(false);
  };

  const handleAncmntDataChange = (e) => {
    setAncmntNewData({ ...newAncmntData, [e.target.name]: e.target.value });
  };
  const handleAncmntChangeDate = (event) => {
    setAncmntNewData({
      ...newAncmntData,
      ["endDate"]: dayjs(event).format("YYYY/MM/DD"),
    });
  };
  const handleAncmntSubmit = async (e) => {
    e.preventDefault();
    const arr = [...ancmnts];
    arr.unshift(newAncmntData);
    setAncmnts(arr);
    const setCommitteeAnnouncements = async () => {
      try {
        const response = await fetch(
          `${ServerUrl}/api/student/setCommitteeAnnouncements`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: JSON.parse(localStorage.getItem("userinfo")).email,
              title: newAncmntData.title,
              description: newAncmntData.description,
              endDate: newAncmntData.endDate,
              type: "General",
              sendTo: "All",
              comname: params.comname,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setAlertOpen(true);
          setSeverity("success");
          setMessage("Announcement set successfully");
        } else {
          setAlertOpen(true);
          setSeverity("error");
          setMessage("Something went wrong, please try again later");
        }
      } catch (error) {
        setAlertOpen(true);
        setSeverity("error");
        setMessage("Something went wrong, please try again later");
      }
    };
    setCommitteeAnnouncements();
    setOpenAncmntDialog(false);
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
      <div className="flex justify-between items-center text-2xl p-1 font-semibold flex-wrap">
        <h2>Announcements</h2>
        {data.roleData.role === params.comname ? (
          <AddButton
            onClick={handleAncmntClickOpenDialog}
            btntext="ADD ANNOUNCEMENT"
          />
        ) : null}
      </div>
      <div className={styles.card}>
        <div className={styles.inner}>
          {ancmnts.map((ancmnt, index) => (
            <AncmntCard
              key={index}
              title={ancmnt.title}
              date={ancmnt.endDate}
              ancmnt={ancmnt.description}
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
            name="endDate"
            label="Date"
            variant="standard"
            format="DD/MM/YYYY"
            onChange={handleAncmntChangeDate}
          />
        </LocalizationProvider>
        <TextField
          required
          margin="dense"
          name="description"
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
      <div className="flex justify-between items-center text-2xl p-1 font-semibold flex-wrap">
        <h2>Committee Events</h2>
        {data.roleData.role === params.comname ? (
          <AddButton onClick={handleEventClickOpenDialog} btntext="ADD EVENT" />
        ) : null}
      </div>
      <div className={styles.card}>
        <div className={styles.inner}>
          {events.map((event, index) => (
            <AddEvent
              key={index}
              endDate={event.endDate}
              name={event.name}
              description={event.description}
            />
          ))}
        </div>
      </div>
      <hr className={styles.divider} />
      <div className="flex justify-between items-center text-2xl p-1 font-semibold flex-wrap">
        <h2>Core Members</h2>
        {data.roleData.role === params.comname ? (
          <div className="flex gap-4">
            <AddButton onClick={handleMemberClickOpenDialog} btntext="ADD" />
            <AddButton
              icon=""
              onClick={handleCpClickOpenDialog}
              btntext="TRANSFER CP"
            />
          </div>
        ) : null}
      </div>
      <div className={styles.tableHeader}>
        <h3>Name</h3>
        <h3>Position</h3>
        {data.roleData.role === params.comname ? <h3>Action</h3> : null}
      </div>
      <hr className={styles.divider} />
      {members.map((member, index) => (
        <div className={styles.cols}>
          <h3>{member.name}</h3>
          <h3>{member.position}</h3>
          {data.roleData.role === params.comname ? (
            <h3>
              <AddButton 
                icon={<DeleteIcon />}
                onClick={handleClickOpen}
                btntext="DELETE"
              />
            </h3>
          ) : null}
        </div>
      ))}
      <MultiFieldModal
        handleDataSubmit={handleMemberSubmit}
        openDialog={openMemberDialog}
        handleClickOpenDialog={handleMemberClickOpenDialog}
        handleCloseDialog={handleMemberCloseDialog}
        title="Add new Member"
      >
        <TextField
          required
          autoFocus
          margin="dense"
          name="name"
          label="Member Name"
          autoComplete="off"
          type="text"
          fullWidth
          variant="standard"
          helperText="Full name of the member"
          onChange={handleMemberDataChange}
        />
        <TextField
          required
          fullWidth
          margin="dense"
          name="position"
          label="Position"
          autoComplete="off"
          type="text"
          variant="standard"
          helperText="Position of the member, Eg. Chairperson"
          onChange={handleMemberDataChange}
        />
      </MultiFieldModal>
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
            name="endDate"
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
      <MultiFieldModal
        handleDataSubmit={handleCpSubmit}
        openDialog={openCpDialog}
        handleClickOpenDialog={handleCpClickOpenDialog}
        handleCloseDialog={handleCpCloseDialog}
        title="Transfer Chairperson Role"
      >
        <TextField
          required
          autoFocus
          margin="dense"
          name="nemail"
          label="Email"
          autoComplete="off"
          type="email"
          fullWidth
          variant="standard"
          helperText="Email id of the incoming Chairperson"
          onChange={handleCpDataChange}
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

export default ComAdmin;

export async function loader({ params }) {
  const response = await fetch(`${ServerUrl}/api/student/getCommitteeDetails`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comname: params.comname,
    }),
  });
  const response1 = await fetch(
    `${ServerUrl}/api/student/getCommitteeAnnouncements`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: JSON.parse(localStorage.getItem("userinfo")).email,
        type: "General",
        comname: params.comname,
      }),
    }
  );
  const response2 = await fetch(`${ServerUrl}/api/student/getCommitteeEvents`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comname: params.comname,
    }),
  });
  //check if link has faculty or student
  let response3 = {}
  if (!window.location.href.includes("faculty")) {
    response3 = await fetch(`${ServerUrl}/api/student/getRole`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: JSON.parse(localStorage.getItem("userinfo")).email,
      }),
    });
    if (!response3.ok) {
      throw json(
        { message: "Could not fetch role information" },
        { status: 422 }
      );
    }
  }
  if (!response.ok || !response1.ok || !response2.ok) {
    throw json(
      { message: "Could not fetch announcement information" },
      { status: 422 }
    );
  }
  let roleData = ""
  if (response.ok && response1.ok && response2.ok) {
    const comData = await response.json();
    const ancmntData = await response1.json();
    const eventData = await response2.json();
    if (!window.location.href.includes("faculty"))
      roleData = await response3.json();
    return { comData, ancmntData, eventData, roleData };
  }
}
