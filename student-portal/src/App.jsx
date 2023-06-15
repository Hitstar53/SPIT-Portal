import React, { useState } from 'react'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MiniDrawer from './components/UI/MiniDrawer'
import './App.css'

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Montserrat',
        'sans-serif',
      ].join(','),
    }
  });
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <MiniDrawer />
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App