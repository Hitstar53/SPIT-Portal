import * as React from "react";
import { useNavigate } from "react-router-dom";
import CustAlert from "../../UI/CustAlert";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import AddButton from "../../UI/AddButton";
import FormModal from "../../UI/Modals/FormModal";
import styles from './SkillSet.module.css'

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function SkillSet(props) {
  const [chipData, setChipData] = React.useState(
    props.skills.skills.map((skill) => {
      return { key: skill, label: skill };
    }) || []
  );
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
    navigate(0);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (chipToDelete) => async () => {
    setChipData((chips) =>
        chips.filter((chip) => chip.key !== chipToDelete.key)
    );
    const response = await fetch(
      "http://localhost:8000/api/student/deleteSkills",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: JSON.parse(localStorage.getItem("userinfo")).email,
          skill:chipData.map(skill=>{
            if(skill.key!==chipToDelete.key){
              return skill.key
            }
          })
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
      setMessage("Skill deleted successfully");
      fetchSkills()
    }
  };

  const addHandler = (newSkill) => {
    if (newSkill) {
      setChipData((chips) => [
        ...chips,
        { key: newSkill, label: newSkill },
      ]);
    }

    const updateSkills = async () => {
      const response = await fetch(
        "http://localhost:8000/api/student/setSkills",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("userinfo")).email,
            skill:newSkill
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
        setMessage("Skills added successfully");
        fetchSkills()
      }
    };
    updateSkills();
  };

  return (
    <React.Fragment>
      <ul className={styles.skills}>
        {chipData.map((data) => {
          return (
            <ListItem 
              key={data.key}
              sx={{
                "& path": {
                  fill: "var(--text-color)",
                }
              }}
            >
              <Chip
                label={data.label}
                onDelete={handleDelete(data)}
                sx={{
                  color: "var(--text-color)",
                  backgroundColor: "var(--pill-color)",
                }}
              />
            </ListItem>
          );
        })}
        <AddButton 
          onClick={handleClickOpen}
          btntext="Add Skill"
          styles={{
            borderColor: "var(--text-color)",
          }}
        />
        {open && (
          <FormModal
            open={open}
            onClose={handleClose}
            title="Add a New Skill"
            label="Skill"
            onSubmit={addHandler}
          />
        )}
      </ul>
      <CustAlert
        open={alertOpen}
        onClose={handleAlertClose}
        severity={severity}
        message={message}
      />
    </React.Fragment>
  );
}