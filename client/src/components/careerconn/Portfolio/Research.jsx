import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustAlert from "../../UI/CustAlert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import AddButton from '../../UI/AddButton'
import PortfolioCard from './PortfolioCard'
import MultiFieldModal from '../../UI/Modals/MultiFieldModal'
import TextField from '@mui/material/TextField'
import styles from "./Projects.module.css";
import ServerUrl from "../../../constants";

const Research = (props) => {
  const [research, setResearch] = useState(props.research.research || []);
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
    const arr = [...research];
    arr.splice(index, 1);
    const deleteResearch = async () => {
      const response = await fetch(
        `${ServerUrl}/api/student/deleteResearch`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("userinfo")).email,
            research: arr,
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
        setMessage("Research deleted successfully");
      }
    };
    deleteResearch();
    setOpen(false);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [newData, setNewData] = useState({});
  const handleDataChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleDataSubmit = (e) => {
    e.preventDefault();
    let techArray = newData.techStack.split(",");
    const updatedData = { ...newData, techStack: techArray };
    const arr = [updatedData, ...research];
    setResearch(arr);
    const updateResearch = async () => {
      const response = await fetch(
        `${ServerUrl}/api/student/setResearch`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("userinfo")).email,
            name:arr[0].name,
            duration:arr[0].duration,
            domain:arr[0].domain,
            techStack:arr[0].techStack,
            description:arr[0].description,
            mentor:arr[0].mentor
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
          setMessage("Research Work added successfully");
        }
      };
      updateResearch();
  };
  return (
    <>
      <h1 className="flex gap-4 items-center text-xl p-1 font-semibold heading">
        Research
        <AddButton btntext="Add Research" onClick={handleClickOpenDialog} />
      </h1>
      <div className={styles.projects}>
        {research
          ? research.map((project, index) => {
              return (
                <PortfolioCard
                  key={index}
                  name={project.name}
                  duration={project.duration}
                  mentor={project.mentor}
                  domain={project.domain}
                  techStack={project.techStack}
                  description={project.description}
                  handleDelete={() => handleClickOpen(index)}
                  style={{
                    bg: "var(--card-alt-color)",
                    font: "var(--text-color)",
                    border: "var(--text-color)",
                  }}
                />
              );
            })
          : ""}
        <MultiFieldModal
          handleDataSubmit={handleDataSubmit}
          openDialog={openDialog}
          handleClickOpenDialog={handleClickOpenDialog}
          handleCloseDialog={handleCloseDialog}
          title="Add new Research Work"
        >
          <TextField
            required
            autoFocus
            margin="dense"
            name="name"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            helperText="Enter title of the research work"
            onChange={handleDataChange}
          />
          <TextField
            required
            margin="dense"
            name="duration"
            label="Academic Year"
            type="text"
            fullWidth
            variant="standard"
            helperText="Enter year of the research work, e.g. 2023"
            onChange={handleDataChange}
          />
          <TextField
            required
            margin="dense"
            name="mentor"
            label="Mentor"
            type="text"
            fullWidth
            variant="standard"
            helperText="Enter name of the mentor"
            onChange={handleDataChange}
          />
          <TextField
            required
            margin="dense"
            name="domain"
            label="Domain"
            type="text"
            fullWidth
            variant="standard"
            helperText="Enter domain of research, e.g. neural networks"
            onChange={handleDataChange}
          />
          <TextField
            required
            margin="dense"
            name="techStack"
            label="Tech Stack"
            type="text"
            fullWidth
            variant="standard"
            helperText="Enter tech stack separated by commas, e.g. react,node,mongodb"
            onChange={handleDataChange}
          />
          <TextField
            required
            multiline
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            helperText="Briefly describe your research work"
            onChange={handleDataChange}
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
      </div>
      <CustAlert
        open={alertOpen}
        onClose={handleAlertClose}
        severity={severity}
        message={message}
      />
    </>
  );
}

export default Research