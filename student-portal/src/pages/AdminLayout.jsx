import React from "react";
import { Box } from "@mui/system";
import MiniDrawer from "../components/UI/MiniDrawer";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />
      <Box
        component="main"
        sx={{ flexGrow: 1, marginTop: 8, overflow: "hidden" }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
