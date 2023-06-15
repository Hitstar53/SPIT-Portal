import React, { useState } from 'react'
import './App.css'
import SideBar from './components/SideBar'
import { Box } from '@mui/system'

const App = () => {
  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: '#F5F6FA', p: 3 }}
        >
        
        </Box>
      </Box>
    </div>
  )
}

export default App