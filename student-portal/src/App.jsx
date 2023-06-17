import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';

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
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
          <MiniDrawer />
          <Box
            component="main"
            sx={{ flexGrow: 1, marginTop: 8 }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} exact/>
              <Route path="/profile" element={<Profile />} exact/>
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  )
}

export default App