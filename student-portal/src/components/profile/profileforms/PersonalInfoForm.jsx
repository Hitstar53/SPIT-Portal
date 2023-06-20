import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CustDatePicker from "../../UI/CustDatePicker";
import styles from "./Forms.module.css";

const PersonalInfoForm = (props) => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <form action="" className={styles.form} id="persinfoform" onSubmit={props.onSubmit}>
        <TextField
            id="outlined-required"
            label="Mobile Number"
            type="text"
            defaultValue={props.info.phone}
        />
        <TextField
            id="outlined-required"
            label="Email"
            type="email"
            defaultValue={props.info.email}
        />
        <TextField
            id="outlined-required"
            label="Address"
            type="text"
            defaultValue={props.info.address}
        />
        <TextField
          id="outlined-required"
          select
          label="Gender"
          defaultValue={props.info.gender}
        >
          <MenuItem key="Male" value="Male">Male</MenuItem>
          <MenuItem key="Female" value="Female">Female</MenuItem>
          <MenuItem key="Other" value="Other">Other</MenuItem>
        </TextField>
        <CustDatePicker 
            label="Date of Birth"
            defaultValue={props.info.dob}
        />
        <TextField
            id="outlined-required"
            label="Religion"
            type="text"
            defaultValue={props.info.religion}
        />
        <TextField
            id="outlined-required"
            label="Blood Group"
            type="text"
            defaultValue={props.info.blood}
        />
        <TextField
            id="outlined-required"
            label="LinkedIn"
            type="text"
            defaultValue={props.info.linkedin}
        />
        <TextField
            id="outlined-required"
            label="Github"
            type="text"
            defaultValue={props.info.github}
            sx={{
              gridColumn: "1 / 3",
            }}
        />
      </form>
    </Box>
  );
};

export default PersonalInfoForm;
