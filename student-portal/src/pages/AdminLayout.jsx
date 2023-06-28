import React from "react";
import { Box } from "@mui/system";
import AdminMiniDrawer from "../components/Admin/AdminMiniDrawer";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AdminMiniDrawer />
      <Box
        component="main"
        sx={{ flexGrow: 1, marginTop: 8, overflowX: "hidden" }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
