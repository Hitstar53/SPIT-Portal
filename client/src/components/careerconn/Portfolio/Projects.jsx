import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import PortfolioCard from "./PortfolioCard"
import MultiFieldModal from '../../UI/Modals/MultiFieldModal'
import AddButton from '../../UI/AddButton'
import styles from './Projects.module.css'


const Projects = (props) => {
  const [projects, setProjects] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  React.useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    console.log(JSON.parse(localStorage.getItem("userinfo")).email);
    const response = await fetch(
      "http://localhost:8000/api/student/getProjects",
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
    if (!response.ok) {
      console.log("error");
    }
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setProjects(data.projects);
    }
  };
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
      console.log(arr)    
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
        console.log("error");
      }
      if (response.ok) {
        const data = await response.json();
        alert("Project Information Added");
        fetchProjects();
        console.log(data);
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
        {
        projects?projects.map((project, index) => {
          return (
            <PortfolioCard
              key={index}
              name={project.name}
              duration={project.duration}
              team={project.team}
              domain={project.domain}
              techStack={project.techStack}
              description={project.description}
              style={""}
            />
          );
        }):""}
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
      </div>
    </>
  );
}

export default Projects