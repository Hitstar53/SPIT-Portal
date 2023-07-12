import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustAlert from "../../UI/CustAlert";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import styles from "./Exams.module.css";
import AddButton from "../../UI/AddButton.jsx";
import TextField from "@mui/material/TextField";
import MultiFieldModal from "../../UI/Modals/MultiFieldModal";
import { InputLabel } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AncmntExam from "./Card";
import ServerUrl from "../../../constants";

const exam = [
  {
    subject: "Database and Management Systems",
    date: "23/6/23",
    syllabus:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    type: "MSE",
    sendTo: "All",
    year: "",
    branch: "",
    division: "",
    uid: "",
  },
];

const Exams = (props) => {
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
  const [exams, setExams] = useState(props.data || [])
  const [openExamDialog, setOpenExamDialog] = useState(false);

  const handleExamClickOpenDialog = () => {
    setOpenExamDialog(true);
    setYear(false);
    setStudent(false);
  };
  const handleExamCloseDialog = () => {
    setOpenExamDialog(false);
  };

  const [newExamData, setExamNewData] = useState({});

  const handleExamDataChange = (e) => {
    setExamNewData({ ...newExamData, [e.target.name]: e.target.value });
  };
  const handleExamChangeDate = (event) => {
    setExamNewData({
      ...newExamData,
      date: dayjs(event).format("YYYY/MM/DD"),
    });
  };
  const handleExamSubmit = (e) => {
    e.preventDefault();
    const arr = [...exams];
    arr.unshift(newExamData);
    const makeExam = async () => {
        console.log(newExamData);
        const response = await fetch(
          `${ServerUrl}/api/student/updateGroupUpcomingExams`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: JSON.parse(localStorage.getItem("userinfo")).email,
              courseName: newExamData.courseName,
              type: newExamData.type,
              date: newExamData.date,
              syllabus: newExamData.syllabus,
              year: newExamData.year,
              branch: newExamData.branch,
              division: newExamData.division,
              batch: newExamDate.batch,
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
        setMessage("Announcement sent successfully");
      }
    };
    makeExam();
  };

  return (
    <div className={styles.facultyExam}>
      <div className={styles.header}>
        <h2 className={styles.subheading}>Exams</h2>
        <AddButton onClick={handleExamClickOpenDialog} btntext="ADD" />
      </div>
      <div className={styles.card}>
        <div className={styles.inner}>
          {exams.map((exam, index) => (
            <AncmntExam
              key={index}
              title={exam.courseName}
              date={exam.date}
              ancmnt={exam.syllabus}
              type={exam.type}
              sendTo={exam.sendTo}
              year={exam.year}
              branch={exam.branch}
              division={exam.division}
            />
          ))}
        </div>
      </div>
      <MultiFieldModal
        handleDataSubmit={handleExamSubmit}
        openDialog={openExamDialog}
        handleClickOpenDialog={handleExamClickOpenDialog}
        handleCloseDialog={handleExamCloseDialog}
        title="Add new exam"
      >
        <TextField
          required
          autoFocus
          margin="dense"
          name="courseName"
          label="Subject"
          autoComplete="off"
          type="text"
          fullWidth
          variant="outlined"
          helperText="Enter subject name"
          onChange={handleExamDataChange}
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
            helperText="Enter date of exam"
            onChange={handleExamChangeDate}
          />
        </LocalizationProvider>
        <TextField
          required
          multiline
          margin="dense"
          name="syllabus"
          label="Syllabus"
          autoComplete="off"
          type="text"
          fullWidth
          variant="outlined"
          helperText="Whats the syllabus?"
          onChange={handleExamDataChange}
        />
        <div className={styles.classSelection}>
          <div className={styles.dropdown}>
            <TextField
              required
              select
              margin="dense"
              name="year"
              label="Year"
              fullWidth
              onChange={handleExamDataChange}
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
              onChange={handleExamDataChange}
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
              onChange={handleExamDataChange}
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
              onChange={handleExamDataChange}
            >
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="D">D</MenuItem>
            </TextField>
          </div>
        </div>
        <TextField
          required
          select
          fullWidth
          margin="dense"
          name="type"
          label="Type"
          helperText="Select type of exam, Eg. ISE or MSE"
          onChange={handleExamDataChange}
        >
          <MenuItem value="ISE">ISE</MenuItem>
          <MenuItem value="LABISE">Lab ISE</MenuItem>
          <MenuItem value="MSE">MSE</MenuItem>
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

export default Exams;
