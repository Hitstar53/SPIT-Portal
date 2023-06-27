import React, { useRef } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import Login from './components/login/Login';
import Activities from './components/extracurr/Activities';
import Courses from './components/academics/Courses/Courses';
import Portfolio from './components/careerconn/Portfolio/Portfolio';
import Internship from './components/careerconn/Internship';
import Placement from './components/careerconn/Placement';
import Events from './components/extracurr/events/Events';
import { Box } from '@mui/system';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Committees from "./components/extracurr/committees/Committees";
import ComAdmin from "./components/extracurr/committees/ComAdmin";
import RootLayout from './pages/RootLayout';
import AdminLayout from './pages/AdminLayout';
import ErrorPage from './pages/ErrorPage';
import './App.css';


const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Login />},
      {
        path: 'student',
        element: <RootLayout />,
        children: [
          { path: 'home', element: <Dashboard /> },
          { path: 'profile', element: <Profile /> },
          { path: 'activities', element: <Activities /> },
          { path: 'courses', element: <Courses /> },
          { path: 'portfolio', element: <Portfolio /> },
          { path: 'internships', element: <Internship /> },
          { path: 'placements', element: <Placement /> },
          { path: 'events', element: <Events /> },
          { path: 'committees', element: <Committees /> },
          { path: 'comadmin', element: <ComAdmin /> },
        ],
      },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
        ],
      },
    ],
  },
])

const App = () => {
  const initialRender = useRef(true)
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Poppins',
        'sans-serif',
      ].join(','),
    }
  });

  return (
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
  )
}

export default App