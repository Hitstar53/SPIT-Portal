import React from 'react';
import Protected from './Protected';
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "react-responsive";
import MiniDrawer from "../components/UI/MiniDrawer";
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
    const [open, setOpen] = React.useState(true);
    const theme = useTheme();
    const extractedQuery = theme.breakpoints.down("sm").substring(7);
    const isMobile = useMediaQuery({ query: extractedQuery });
    const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem("isLoggedIn"));

    React.useEffect(() => {
      const flag = localStorage.getItem("isLoggedIn");
      console.log(flag);
      if (flag === "true") {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, []);

    return (
      <Box
        sx={{ display: "flex", height: "100vh", background: "var(--bg-color)" }}
      >
        <MiniDrawer open={open} setOpen={setOpen} />
        <Box
          component="main"
          sx={{
            display: isMobile && open ? "none" : "block",
            flexGrow: 1,
            marginTop: 8,
            overflowX: "hidden",
            backgroundColor: "var(--bg-color)",
          }}
        >
          <Protected isLoggedIn={isLoggedIn} >
            <Outlet />
          </Protected>
        </Box>
      </Box>
    );
}

export default RootLayout