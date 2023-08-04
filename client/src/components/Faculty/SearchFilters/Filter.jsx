import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

export default function Filter(props) {
  const [newData, setNewData] = React.useState({});
  const handleDataChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  const handleDataSubmit = async (e) => {
    e.preventDefault();
    props.onSubmit(newData);
  };
  return (
    <Box
      className="mt-2 flex flex-row justify-between gap-5 items-center flex-wrap"
      component="form"
      noValidate
      sx={{
        "& .MuiOutlinedInput-input": {
          color: "var(--text-color) !important",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--dark-override-color) !important",
        },
        "& .MuiInputLabel-root": { color: "var(--text-color) !important" },
        "& .Mui-focused": { color: "var(--dark-override-color) !important" },
      }}
      autoComplete="off"
      onSubmit={handleDataSubmit}
    >
      <p className="text-xl font-semibold">Available Filters</p>
      <div className="flex flex-row gap-6 items-center flex-wrap flex-1">
        <TextField
          required
          name="type"
          id="outlined-required"
          select
          size="small"
          sx={{
            width: "15rem",
            color: "var(--text-color)",
            background: "var(--bg-color-2)",
          }}
          label="Select Type"
          onChange={handleDataChange}
        >
          {props.options.map((item) => {
            return <MenuItem value={item.value}>{item.name}</MenuItem>;
          })}
        </TextField>
        {props.filters.map((item) => {
          return (
            <TextField
              id={item.id}
              name={item.id}
              label={item.label}
              variant="outlined"
              size="small"
              onChange={handleDataChange}
              sx={{
                width: "17rem",
                color: "var(--text-color)",
                background: "var(--bg-color-2)",
              }}
            />
          );
        })}
        <Button
          type="submit"
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
    </Box>
  );
}
