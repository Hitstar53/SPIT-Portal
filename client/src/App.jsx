import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/login/Login';
import Dashboard, {loader as DashboardLoader} from './components/dashboard/Dashboard';
import Profile, { loader as ProfileLoader } from './components/profile/Profile';
import Result, {loader as SemesterLoader} from './components/academics/Result/Result';
import SemResult, {loader as SemResultLoader} from './components/academics/Result/SemResult';
import Activities, { loader as ActivityLoader } from './components/extracurr/activities/Activities';
import Courses from './components/academics/Courses/Courses';
import TimeTable from './components/academics/Timetable/TimeTable';
import Portfolio, { loader as PortfolioLoader } from './components/careerconn/Portfolio/Portfolio';
import Internship, { loader as InternLoader } from './components/careerconn/Internship';
import Placement, { loader as PlacementLoader } from './components/careerconn/Placement';
import Events, { loader as EventsLoader } from './components/extracurr/events/Events';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Committees, { loader as CommitteesLoader } from "./components/extracurr/committees/Committees";
import ComAdmin, {loader as ComAdminLoader} from "./components/extracurr/committees/ComAdmin";
import Notification from './components/Notifications/Notifications';
import RootLayout from './pages/RootLayout';
import FacultyLayout from './pages/FacultyLayout';
import ErrorPage from './pages/ErrorPage';
import Faculty, {loader as facultyLoader} from './components/Faculty/Faculty';
import Announcements, {loader as AncmntsLoader} from './components/Faculty/Announcements/Announcements';
import Info from './components/Faculty/SearchFilters/Info';
import Professional from './components/Faculty/SearchFilters/Professional';
import Project from './components/Faculty/SearchFilters/Project';
import ExtraCurr from './components/Faculty/SearchFilters/ExtraCurr';
import UploadMarks from './components/Faculty/Upload Marks/UploadMarks';
import ProfileDownload, {loader as ProfileDownloader} from './components/Faculty/SearchFilters/ProfileDownload';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Login /> },
      {
        path: "student",
        element: <RootLayout />,
        children: [
          { path: "home", element: <Dashboard />, loader: DashboardLoader },
          { path: "profile", element: <Profile />, loader: ProfileLoader },
          { path: "notifications", element: <Notification /> },
          { path: "courses", element: <Courses /> },
          { path: "timetable", element: <TimeTable /> },
          { path: "result", element: <Result />, loader: SemesterLoader },
          { path: "result/:semester", element: <SemResult />, loader: SemResultLoader },
          { path: "activities", element: <Activities />, loader: ActivityLoader },
          { path: "events", element: <Events />, loader: EventsLoader },
          { path: "committees", element: <Committees />, loader: CommitteesLoader },
          { path: "committees/:comname", element: <ComAdmin />, loader: ComAdminLoader},
          { path: "portfolio", element: <Portfolio />, loader: PortfolioLoader },
          { path: "internships", element: <Internship />, loader: InternLoader },
          { path: "placement", element: <Placement />, loader: PlacementLoader },
        ],
      },
      {
        path: "faculty",
        element: <FacultyLayout />,
        children: [
          { path: "home", element: <Faculty /> , loader: facultyLoader},
          { path: "announcements", element: <Announcements />, loader: AncmntsLoader },
          { path: "committee info", element: <Committees />, loader: CommitteesLoader },
          { path: "committee info/:comname", element: <ComAdmin />, loader: ComAdminLoader},
          { path: "informational", element: <Info /> },
          { path: "professional", element: <Professional /> },
          { path: "extracurricular", element: <ExtraCurr /> },
          { path: "project", element: <Project /> },
          { path: "upload marks", element: <UploadMarks />},
          { path: "download/:uid", element: <ProfileDownload />, loader: ProfileDownloader },
        ],
      },
    ],
  },
]);

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