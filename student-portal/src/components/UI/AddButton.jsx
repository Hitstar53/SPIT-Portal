import React from "react";
import Button from "@mui/material/Button";

const AddButton = (props) => {
  return (
    <Button
      size="small"
      variant="outlined"
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
        padding: "0.25rem 0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.4rem",},...{...props.styles}
      }}
    >
      <i className="fa-solid fa-plus"></i>
      <span>ADD</span>
    </Button>
  );
};

export default AddButton;
