import * as React from "react";
import { useNavigate } from "react-router-dom";
import CustAlert from "../../UI/CustAlert";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import AddButton from "../../UI/AddButton";
import FormModal from "../../UI/Modals/FormModal";
import styles from './SkillSet.module.css'
import ServerUrl from "../../../constants";

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
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (chipToDelete) => async () => {
    let arr = [...chipData]
    setChipData((chips) =>
        chips.filter((chip) => chip.key !== chipToDelete.key)
    );
    let updatedArr = arr.filter(skill=>{
      return (skill.key !== chipToDelete.key)
      }).map(skill => {return skill.key})
    const response = await fetch(
      `${ServerUrl}/api/student/deleteSkills`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: JSON.parse(localStorage.getItem("userinfo")).email,
          skill:updatedArr
        }),
      }
    );
    if (!response.ok) {
      setAlertOpen(true);
      setSeverity("error");
      setMessage("Something went wrong, please try again later");
    } else {
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
        `${ServerUrl}/api/student/setSkills`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("userinfo")).email,
            skill: newSkill
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
            helperText="Enter a skill Name, e.g. Java"
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