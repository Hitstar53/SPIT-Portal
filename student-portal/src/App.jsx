import React, { useState, useEffect, useRef } from 'react'
import { Route, Routes, useMatch,useNavigate } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import Login from './components/login/Login';
import Activities from './components/extracurr/Activities';
import Courses from './components/academics/Courses/Courses';
import Portfolio from './components/careerconn/Portfolio/Portfolio';
import Internship from './components/careerconn/Internship';
import Placement from './components/careerconn/Placement';
import Events from './components/extracurr/Events';
import { Box } from '@mui/system';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MiniDrawer from './components/UI/MiniDrawer';
import './App.css';
import Committees from "./components/extracurr/Committees";
import ComAdmin from "./components/extracurr/ComAdmin";

const App = () => {
  const navigate = useNavigate()
  const initialRender = useRef(true)
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Poppins',
        'sans-serif',
      ].join(','),
    }
  });
  let match = useMatch('/')


  // useEffect(()=>{
  //   const isLoggedIn = localStorage.getItem('isLoggedIn')
  //   if (isLoggedIn==="false") {
  //     navigate('/')
  //   }
  // },[])

  // useEffect(() => {
  //   if (initialRender.current) {
  //     initialRender.current = false;
  //     return;
  //   }
  //   localStorage.setItem("isLoggedIn", false);
  // }, []);

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
                <Route path="/student/courses" element={<Courses />} exact/>
                <Route path="/student/activities" element={<Activities />} exact/>
                <Route path="/student/committees" element={<Committees />} exact/>
                <Route path="/student/comadmin" element={<ComAdmin />} exact/>
                <Route path="/student/events" element={<Events />} exact/>
                <Route path="/student/portfolio" element={<Portfolio />} exact/>
                <Route path="/student/internships" element={<Internship />} exact/>
                <Route path="/student/placements" element={<Placement />} exact/>
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
  )
}

export default App