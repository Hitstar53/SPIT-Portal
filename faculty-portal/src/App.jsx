import React, { useState } from 'react'
import './App.css'
import SideBar from './components/SideBar'
import { Box } from '@mui/system'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Classes from './pages/Classes'
import Attendance from './pages/Attendance'
import Leaves from './pages/Leaves'
import MiniProj from './pages/MiniProj';
import Appraisal from './pages/Appraisal';
import ViewProfile from './pages/ViewProfile';

const App = () => {
  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: '#F5F6FA', marginTop: 8 }}
        >
          <Router>
            <Routes>
              {/* <Route path="/login" element={} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<ViewProfile />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/leaves" element={<Leaves />} />
              <Route path="/mini-proj" element={<MiniProj />} />
              <Route path="/appraisal" element={<Appraisal />} />
            </Routes>
          </Router>
        </Box>
      </Box>
    </div>
  )
}

export default App