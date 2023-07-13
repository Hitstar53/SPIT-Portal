import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

const AddButton = (props) => {
  return (
    <Button
      size="medium"
      variant="outlined"
      startIcon={props.icon !== undefined ? props.icon : <AddIcon />}
      onClick={props.onClick}
      sx={{
        ...{":hover": {
          backgroundColor: "var(--text-color)",
          color: "var(--bg-color)",
          border: "1px solid var(--secondary-color)",
        },
        color: "var(--text-color)",
        border: "1px solid var(--text-color)",
        borderRadius: "100vw",
        padding: "0.25rem 1rem"},...{...props.styles}
      }}
    >
      <span>{props.btntext}</span>
    </Button>
  );
};

export default AddButton;
