import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import HistoryIcon from '@mui/icons-material/History';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import ArticleIcon from '@mui/icons-material/Article';

export const PrincipalSideBar = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    path: '/home',
  },
  // {
  //   title: 'Classes',
  //   icon: <SchoolIcon />,
  //   path: '/classes',
  // },
  // {
  //   title: 'Attendance',
  //   icon: <AssignmentIndIcon />,
  //   path: '/attendance',
  // },
  // {
  //   title: 'Leaves',
  //   icon: <HolidayVillageIcon />,
  //   path: '/leaves',
  // },
  // {
  //   title: 'Mini Project',
  //   icon: <IntegrationInstructionsIcon />,
  //   path: '/mini-proj',
  // },
  {
      title: 'History',
      icon: <HistoryIcon />,
      path: '/view-history',
    },
    {
      title: 'View Appraisal',
      icon: <ArticleIcon/>,
      path: '/all_appraisall',
    },
  
];