import React from 'react'
import styles from "./Forms.module.css";

const EduInfoForm = () => {
    return (
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "20ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className={styles.form}>
          <TextField id="outlined-required" label="Name" />
          <TextField id="outlined-required" label="Email" />
          <TextField id="outlined-required" label="Phone" />
          <TextField id="outlined-required" label="Address" />
          <TextField id="outlined-required" label="City" />
        </div>
      </Box>
    );
}

export default EduInfoForm