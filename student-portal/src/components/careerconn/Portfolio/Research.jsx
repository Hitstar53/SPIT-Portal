import React, { useState } from 'react'
import AddButton from '../../UI/AddButton'
import PortfolioCard from './PortfolioCard'
import MultiFieldModal from '../../UI/Modals/MultiFieldModal'
import TextField from '@mui/material/TextField'
import styles from "./Projects.module.css";

const ResearchData = [
  {
    title: "ReviewScope - AI Product Reviewer",
    duration: "3 months",
    mentor: "Prof. Anand Godbole",
    domain: "Machine Learning",
    techStack: ["React", "Node", "MongoDB", "Express", "HTML", "CSS", "JS"],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    title: "ReviewScope - AI Product Reviewer",
    duration: "2 months",
    mentor: "Prof. Anand Godbole",
    domain: "Web Development",
    techStack: ["React", "Node", "MongoDB", "Express", "HTML", "CSS", "JS"],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
];

const Research = () => {
  const [research, setResearch] = useState(ResearchData);
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
  };
  return (
    <>
      <h1 className="flex gap-4 items-center text-xl p-1 font-semibold heading">
        Research
        <AddButton 
          btntext="Add Research" 
          onClick={handleClickOpenDialog}
        />
      </h1>
      <div className={styles.projects}>
        {research.map((project, index) => {
          return (
            <PortfolioCard
              key={index}
              title={project.title}
              duration={project.duration}
              team={project.team}
              mentor={project.mentor}
              domain={project.domain}
              techStack={project.techStack}
              description={project.description}
              style={{
                bg: "var(--card-alt-color)",
                font: "var(--text-color)",
                border: "var(--text-color)",
              }}
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
            name="mentor"
            label="Mentor"
            type="text"
            fullWidth
            variant="standard"
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

export default Research