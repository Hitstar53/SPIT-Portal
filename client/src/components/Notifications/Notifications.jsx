import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import Stack from '@mui/material/Stack'
import Notif from './Notif'
import styles from './Notif.module.css'

const Notification = () => {
    const navigate = useNavigate();
    const container = styles.container + " flex flex-col gap-8 p-8";
    const darkTheme = createTheme({
      palette: {
        mode: "dark",
      },
    });
    return (
      <div className={container}>
        <h1 className="flex items-center gap-4 text-4xl font-semibold">
          <FaArrowLeft
            onClick={() => navigate(-1)}
            className="text-2xl cursor-pointer"
          />
          Notifications
        </h1>
        <ThemeProvider theme={darkTheme}>
          <Stack sx={{ width: "100%" }}>
            <Notif />
            <Notif />
            <Notif />
          </Stack>
        </ThemeProvider>
      </div>
    );
}

export default Notification