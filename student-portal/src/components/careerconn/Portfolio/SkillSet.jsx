import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import AddButton from "../../UI/AddButton";
import FormModal from "../../UI/FormModal";
import styles from './SkillSet.module.css'

const skills = [
  "Java", 
  "Python", 
  "HTML", 
  "CSS", 
  "JavaScript", 
  "React", 
  "Node.js"
];

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function SkillSet() {
  const [chipData, setChipData] = React.useState(
    skills.map((skill) => {
      return { key: skill, label: skill };
    })
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

  const addHandler = (newSkill) => {
    if (newSkill) {
      setChipData((chips) => [
        ...chips,
        { key: newSkill, label: newSkill },
      ]);
    }
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