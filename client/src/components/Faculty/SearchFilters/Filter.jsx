import * as React from 'react'
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

export default function Filter(props) {
  return (
    <div className="mt-2 flex flex-row gap-6 items-center">
      <p className="text-xl font-semibold">Available Filters</p>
      <TextField
        required
        name="type"
        id="outlined-required"
        select
        size="small"
        sx={{
          width: "12rem",
          color: "var(--text-color)",
          background: "var(--bg-color-2)",
        }}
        label="Select Type"
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Internship">Internship</MenuItem>
        <MenuItem value="Placement">Placement</MenuItem>
      </TextField>
      <TextField
        id="organization"
        label="Organization"
        variant="outlined"
        size="small"
        sx={{
          width: "20rem",
          color: "var(--text-color)",
          background: "var(--bg-color-2)",
        }}
      />
      <TextField
        id="ctc"
        label="C.T.C"
        variant="outlined"
        size="small"
        sx={{
          color: "var(--text-color)",
          backgroundColor: "var(--bg-color-2)",
        }}
      />
      <Button
        variant="contained"
        size="small"
        sx={{
          color: "var(--text-light)",
          backgroundColor: "var(--primary-color)",
          borderRadius: "0.5rem",
          paddingX: "1rem",
          fontSize: "1rem",
          fontWeight: "bold",
          textTransform: "none",
          "&:hover": {
            color: "var(--text-dark)",
            backgroundColor: "var(--secondary-color)",
          },
        }}
      >
        Search
      </Button>
    </div>
  );
}