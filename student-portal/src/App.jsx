import React, { useState } from 'react'
import { Route, Routes, useMatch, useLocation } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import Login from './components/login/Login';
import Activities from './components/extracurr/Activities';
import { Box } from '@mui/system';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MiniDrawer from './components/UI/MiniDrawer'
import './App.css'

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Poppins',
        'sans-serif',
      ].join(','),
    }
  });
  let match = useMatch('/')
  return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
          {match ? null : <MiniDrawer />}
          <Box
            component="main"
            sx={{ flexGrow: 1, marginTop: match ? 0 : 8, overflow: 'hidden' }}
          >
            <Routes>
                <Route path="/" element={<Login />} exact/>
                <Route path="/student/home" element={<Dashboard />} exact/>
                <Route path="/student/profile" element={<Profile />} exact/>
                <Route path="/student/activities" element={<Activities />} exact/>
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
  )
}

export default App