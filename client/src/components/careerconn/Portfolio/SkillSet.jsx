import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import AddButton from "../../UI/AddButton";
import FormModal from "../../UI/Modals/FormModal";
import styles from './SkillSet.module.css'



const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function SkillSet() {
  const [chipData, setChipData] = React.useState(
    []
  );

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
        chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  React.useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    console.log(JSON.parse(localStorage.getItem("userinfo")).email);
    const response = await fetch(
      "http://localhost:8000/api/student/getSkills",
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
      setChipData(data.skills.map((skill) => {
        return { key: skill, label: skill };
      }));
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
        console.log("error");
      }
      if (response.ok) {
        const data = await response.json();
        alert("Skills Updated");
        fetchSkills()
      }
    };
    updateSkills();
  };

  return (
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
  );
}