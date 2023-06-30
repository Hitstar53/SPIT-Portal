import React, { useState } from 'react'
import AddButton from '../../UI/AddButton'
import PortfolioCard from './PortfolioCard'
import MultiFieldModal from '../../UI/Modals/MultiFieldModal'
import TextField from '@mui/material/TextField'
import styles from "./Projects.module.css";

const Research = () => {
  const [research, setResearch] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  React.useEffect(() => {
    fetchResearch();
  }, []);

  const fetchResearch = async () => {
    console.log(JSON.parse(localStorage.getItem("userinfo")).email);
    const response = await fetch(
      "http://localhost:8000/api/student/getResearch",
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
      setResearch(data.research);
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

  const handleDataSubmit = (e) => {
    e.preventDefault();
    let techArray = newData.techStack.split(",");
    const updatedData = { ...newData, techStack: techArray };
    const arr = [updatedData, ...research];
    setResearch(arr);
    const updateResearch = async () => {
      const response = await fetch(
        "http://localhost:8000/api/student/setResearch",
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
          console.log("error");
        }
        if (response.ok) {
          const data = await response.json();
          alert("Research Updated");
          fetchResearch()
        }
      };
      updateResearch();
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
        {research?research.map((project, index) => {
          return (
            <PortfolioCard
              key={index}
              name={project.name}
              duration={project.duration}
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