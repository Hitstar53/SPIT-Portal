import React from "react";
import { Box } from "@mui/system";
import FacultyMiniDrawer from "../components/Faculty/FacultyMiniDrawer";
import { Outlet } from "react-router-dom";

const FacultyLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <FacultyMiniDrawer />
      <Box
        component="main"
        sx={{ flexGrow: 1, marginTop: 8, overflowX: "hidden" }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default FacultyLayout;
