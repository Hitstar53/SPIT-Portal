import React, { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import styles from "./Ancmnts.module.css";
import CustAlert from "../../UI/CustAlert";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import AddButton from "../../UI/AddButton.jsx";
import TextField from "@mui/material/TextField";
import MultiFieldModal from "../../UI/Modals/MultiFieldModal";
import MenuItem from "@mui/material/MenuItem";
import AncmntCard from "./AncmntCard";
import ServerUrl from "../../../constants";

const Ancmnts = (props) => {
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

  const [ancmnts, setAncmnts] = useState(props.data || []);

  const [openAncmntDialog, setOpenAncmntDialog] = useState(false);

  const handleAncmntClickOpenDialog = () => {
    setOpenAncmntDialog(true);
    setYear(false);
    setStudent(false);
  };
  const handleAncmntCloseDialog = () => {
    setOpenAncmntDialog(false);
  };

  const [newAncmntData, setAncmntNewData] = useState({});

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
    let updatedData = {}
    if (newAncmntData.uid !== undefined) {
      let uidList = newAncmntData.uid.split(",");
      updatedData = {
        ...newAncmntData,
        uid: uidList,
      }
    } else {
      updatedData = {
        ...newAncmntData,
      }
    }
    const makeAnnouncement = async () => {
      let response = {};
      if (student) {
        response = await fetch(
          `${ServerUrl}/api/student/setAnnouncementsSpecificStudents`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: JSON.parse(localStorage.getItem("userinfo")).email,
              title: updatedData.title,
              type: updatedData.type,
              endDate: updatedData.date,
              description: updatedData.ancmnt,
              students: updatedData.uid,
            }),
          }
        );
      } else if (year) {
        response = await fetch(
          `${ServerUrl}/api/student/setAnnouncementsGroupStudents`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: JSON.parse(localStorage.getItem("userinfo")).email,
              title: updatedData.title,
              type: updatedData.type,
              endDate: updatedData.date,
              description: updatedData.ancmnt,
              year: updatedData.year,
              branch: updatedData.branch,
              division: updatedData.division,
              batch: updatedData.batch,
            }),
          }
        );
      } else {
        response = await fetch(
          `${ServerUrl}/api/student/setAnnouncementsAllStudents`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: JSON.parse(localStorage.getItem("userinfo")).email,
              title: updatedData.title,
              type: updatedData.type,
              endDate: updatedData.date,
              description: updatedData.ancmnt,
            }),
          }
        );
      }
      if (!response.ok) {
        setAlertOpen(true);
        setSeverity("error");
        setMessage("Something went wrong, please try again later");
      }
      if (response.ok) {
        const data = await response.json();
        setAlertOpen(true);
        setSeverity("success");
        setMessage("Announcement sent successfully");
      }
    };
    makeAnnouncement();
  };

  const allHandler = () => {
    setYear(false);
    setStudent(false);
  };

  const [year, setYear] = useState(false);
  const yearHandler = () => {
    setYear(true);
    setStudent(false);
  };

  const [student, setStudent] = useState(false);
  const studentHandler = () => {
    setYear(false);
    setStudent(true);
  };

  return (
    <div className={styles.facultyAncmnt}>
      <div className={styles.header}>
        <h2 className={styles.subheading}>Announcements</h2>
        <AddButton onClick={handleAncmntClickOpenDialog} btntext="ADD" />
      </div>
      <div className={styles.card}>
      {ancmnts.length === 0 ? 
      <div className={styles.cardItem}>
        <p
          style={{
            gridColumn: "1 / 3",
            fontSize: "1rem",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          No Announcements Yet</p>
      </div> :
        (<div className={styles.inner}>
          {ancmnts?.map((ancmnt, index) => (
            <AncmntCard
              key={index}
              title={ancmnt.title}
              date={ancmnt.date}
              ancmnt={ancmnt.description}
              type={ancmnt.type}
              sendTo={ancmnt.sendTo}
              year={ancmnt.year}
              branch={ancmnt.branch}
              division={ancmnt.division}
              uid={ancmnt.uid}
            />
          ))}
        </div>)}

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
          variant="outlined"
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
            format="DD/MM/YYYY"
            variant="outlined"
            helperText="End date of the announcement"
            onChange={handleAncmntChangeDate}
          />
        </LocalizationProvider>
        <TextField
          required
          multiline
          margin="dense"
          name="ancmnt"
          label="Announcement"
          autoComplete="off"
          type="text"
          fullWidth
          variant="outlined"
          helperText="Announcement Details"
          onChange={handleAncmntDataChange}
        />
        <TextField
          select
          required
          margin="dense"
          name="sendTo"
          fullWidth
          label="Send To"
          placeholder="Send To"
          helperText="This announcement is for?"
          onChange={handleAncmntDataChange}
        >
          <MenuItem value="All" onClick={allHandler}>
            All
          </MenuItem>
          <MenuItem value="Class" onClick={yearHandler}>
            Year
          </MenuItem>
          <MenuItem value="Student" onClick={studentHandler}>
            Student
          </MenuItem>
        </TextField>
        {year ? (
          <div className={styles.classSelection}>
            <div className={styles.dropdown}>
              <TextField
                required
                select
                margin="dense"
                name="year"
                label="Year"
                fullWidth
                onChange={handleAncmntDataChange}
              >
                <MenuItem value="FE">FE</MenuItem>
                <MenuItem value="SE">SE</MenuItem>
                <MenuItem value="TE">TE</MenuItem>
                <MenuItem value="BE">BE</MenuItem>
              </TextField>
            </div>
            <div className={styles.dropdown}>
              <TextField
                required
                select
                margin="dense"
                name="branch"
                fullWidth
                label="Branch"
                onChange={handleAncmntDataChange}
              >
                <MenuItem value="Comps">Comps</MenuItem>
                <MenuItem value="CSE">CSE</MenuItem>
                <MenuItem value="AIML">AIML</MenuItem>
                <MenuItem value="DS">DS</MenuItem>
                <MenuItem value="EXTC">EXTC</MenuItem>
                <MenuItem value="MCA">MCA</MenuItem>
                <MenuItem value="ETRX">ETRX</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
              </TextField>
            </div>
            <div className={styles.dropdown}>
              <TextField
                select
                required
                margin="dense"
                name="division"
                label="Division"
                fullWidth
                onChange={handleAncmntDataChange}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
                <MenuItem value="D">D</MenuItem>
                <MenuItem value="E">E</MenuItem>
                <MenuItem value="F">F</MenuItem>
                <MenuItem value="G">G</MenuItem>
                <MenuItem value="H">H</MenuItem>
              </TextField>
            </div>
            <div className={styles.dropdown}>
              <TextField
                optional
                select
                margin="dense"
                name="batch"
                label="Batch"
                fullWidth
                onChange={handleAncmntDataChange}
              >
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
                <MenuItem value="D">D</MenuItem>
              </TextField>
            </div>
          </div>
        ) : null}
        {student ? (
          <div>
            <TextField
              required
              name="uid"
              margin="dense"
              label="Enter UID"
              autoComplete="off"
              type="text"
              fullWidth
              variant="outlined"
              helperText="Enter UID of the students, seperate by comma (,) Eg: 2021300108,2021300110"
              onChange={handleAncmntDataChange}
            />
          </div>
        ) : null}
        <TextField
          required
          select
          margin="dense"
          name="type"
          fullWidth
          label="Type"
          onChange={handleAncmntDataChange}
        >
          <MenuItem value="General">General</MenuItem>
          <MenuItem value="Academic">Academic</MenuItem>
        </TextField>
      </MultiFieldModal>
      <CustAlert
        open={alertOpen}
        onClose={handleAlertClose}
        severity={severity}
        message={message}
      />
    </div>
  );
};

export default Ancmnts;