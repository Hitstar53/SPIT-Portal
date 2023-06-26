import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import PortfolioCard from "./PortfolioCard"
import MultiFieldModal from '../../UI/Modals/MultiFieldModal'
import AddButton from '../../UI/AddButton'
import styles from './Projects.module.css'

const ProjectData = [
  {
    title: "ReviewScope - AI Product Reviewer",
    duration: "3 months",
    team: ["Hatim", "Omkar", "Udit"],
    domain: "Web Development",
    techStack: ["React", "Node", "MongoDB", "Express", "HTML", "CSS", "JS"],
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    title: "ReviewScope - AI Product Reviewer",
    duration: "2 months",
    team: ["Hatim", "Omkar", "Udit"],
    domain: "Web Development",
    techStack: ["React", "Node", "MongoDB", "Express", "HTML", "CSS", "JS"],
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
]

const Projects = (props) => {
  const [projects, setProjects] = useState(ProjectData);
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
    setProjects(arr);
  };
  
  return (
    <>
      <h1 className="flex gap-4 items-center text-xl p-1 font-semibold heading">
        Projects
        <AddButton onClick={handleClickOpenDialog} btntext="Add Project" />
      </h1>
      <div className={styles.projects}>
        {projects.map((project, index) => {
          return (
            <PortfolioCard
              key={index}
              title={project.title}
              duration={project.duration}
              team={project.team}
              domain={project.domain}
              techStack={project.techStack}
              description={project.description}
              style={""}
            />
          );
        })}
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
            name="title"
            label="Title"
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