import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustAlert from '../../UI/CustAlert'
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from '@mui/material/TextField'
import PortfolioCard from "./PortfolioCard"
import MultiFieldModal from '../../UI/Modals/MultiFieldModal'
import AddButton from '../../UI/AddButton'
import styles from './Projects.module.css'


const Projects = (props) => {
  const [projects, setProjects] = useState(props.projects.projects || [])
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
    const arr = [...projects];
    arr.splice(index, 1);
    const deleteProject = async () => {
      const response = await fetch(
        "http://localhost:8000/api/student/deleteProjects",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("userinfo")).email,
            projects: arr,
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
    deleteProject();
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
  const handleDataSubmit = async (e) => {
    e.preventDefault();
    let teamArray = newData.team.split(",");
    let techArray = newData.techStack.split(",");
    const updatedData = { ...newData, team: teamArray , techStack: techArray};
    const arr = [updatedData, ...projects];
    const updateProjects = async () => {
      const response = await fetch(
        "http://localhost:8000/api/student/setProjects",
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
            team:arr[0].team,
            description:arr[0].description,
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
    updateProjects();
  };
  
  return (
    <>
      <h1 className="flex gap-4 items-center text-xl p-1 font-semibold heading">
        Projects
        <AddButton onClick={handleClickOpenDialog} btntext="Add Project" />
      </h1>
      <div className={styles.projects}>
        {projects
          ? projects.map((project, index) => {
              return (
                <PortfolioCard
                  key={index}
                  name={project.name}
                  duration={project.duration}
                  team={project.team}
                  domain={project.domain}
                  techStack={project.techStack}
                  description={project.description}
                  handleDelete={() => handleClickOpen(index)}
                  style={""}
                />
              );
            })
          : ""}
        <MultiFieldModal
          handleDataSubmit={handleDataSubmit}
          openDialog={openDialog}
          handleClickOpenDialog={handleClickOpenDialog}
          handleCloseDialog={handleCloseDialog}
          title="Add a Project"
        >
          <TextField
            required
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleDataChange}
          />
          <TextField
            required
            margin="dense"
            name="duration"
            label="Duration"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleDataChange}
          />
          <TextField
            required
            margin="dense"
            name="team"
            label="Team"
            type="text"
            fullWidth
            variant="standard"
            helperText="Enter team members separated by commas, e.g. hatim,saad,yusuf"
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

export default Projects