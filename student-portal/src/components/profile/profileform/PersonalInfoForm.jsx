import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CustDatePicker from "../../UI/CustDatePicker";
import styles from "./ProfileForm.module.css";

const PersonalInfoForm = () => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <span className={styles.form}>
        <TextField
            id="outlined-required"
            label="Mobile Number"
            type="text"
        />
        <TextField
            id="outlined-required"
            label="Email"
            type="email"
        />
        <TextField
            id="outlined-required"
            label="Address"
            type="text"
        />
        <TextField
          id="outlined-required"
          select
          label="Gender"
          placeholder="Gender"
        >
          <MenuItem key="Male" value="Male">Male</MenuItem>
          <MenuItem key="Female" value="Female">Female</MenuItem>
          <MenuItem key="Other" value="Other">Other</MenuItem>
        </TextField>
        <CustDatePicker 
            label="Date of Birth" 
        />
        <TextField
            id="outlined-required"
            label="Religion"
            type="text"
        />
        <TextField
            id="outlined-required"
            label="Blood Group"
            type="text"
        />
        <TextField
            id="outlined-required"
            label="LinkedIn"
            type="text"
        />
        <TextField
            id="outlined-required"
            label="Github"
            type="text"
            sx={{
              gridColumn: "1 / 3",
            }}
        />
      </span>
    </Box>
  );
};

export default PersonalInfoForm;
