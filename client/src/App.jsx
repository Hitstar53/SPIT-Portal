import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import Result from './components/academics/Result/Result';
import SemResult from './components/academics/Result/SemResult';
import Activities from './components/extracurr/activities/Activities';
import Courses from './components/academics/Courses/Courses';
import Portfolio from './components/careerconn/Portfolio/Portfolio';
import Internship from './components/careerconn/Internship';
import Placement from './components/careerconn/Placement';
import Events from './components/extracurr/events/Events';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Committees from "./components/extracurr/committees/Committees";
import ComAdmin from "./components/extracurr/committees/ComAdmin";
import RootLayout from './pages/RootLayout';
import AdminLayout from './pages/AdminLayout';
import ErrorPage from './pages/ErrorPage';
import Admin from './components/Admin/Admin';
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
          { path: 'result', element: <Result /> },
          { path: 'result/:semester', element: <SemResult /> },
          { path: 'activities', element: <Activities /> },
          { path: 'courses', element: <Courses /> },
          { path: 'portfolio', element: <Portfolio /> },
          { path: 'internships', element: <Internship /> },
          { path: 'placements', element: <Placement /> },
          { path: 'events', element: <Events /> },
          { path: 'committees', element: <Committees /> },
          { path: 'committees/:comname', element: <ComAdmin /> },
        ],
      },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          { path: 'home', element: <Admin /> },
        ],
      },
    ],
  },
])

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
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
  )
}

export default App