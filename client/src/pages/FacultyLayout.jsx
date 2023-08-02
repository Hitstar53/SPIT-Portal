import React from "react";
import { Box } from "@mui/system";
import FacultyProtected from "../pages/FacultyProtected";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "react-responsive";
import FacultyMiniDrawer from "../components/Faculty/FacultyMiniDrawer";
import { Outlet, useNavigation } from "react-router-dom";

const FacultyLayout = () => {
  const [open, setOpen] = React.useState(true);
  const navigation = useNavigation();
  const theme = useTheme();
  const extractedQuery = theme.breakpoints.down("sm").substring(7);
  const isMobile = useMediaQuery({ query: extractedQuery });
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    localStorage.getItem("isLoggedIn")
  );
  React.useEffect(() => {
    const flag = localStorage.getItem("isLoggedIn");
    document.title = "Faculty Portal";
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
      <FacultyMiniDrawer open={open} setOpen={setOpen} />
      <Box
        component="main"
        sx={{
          // display: isMobile && open ? "none" : "block",
          flexGrow: 1,
          marginTop: 8,
          overflowX: "hidden",
          backgroundColor: "var(--bg-color)",
        }}
      >
        <FacultyProtected isLoggedIn={isLoggedIn}>
          {navigation.state === "loading" ? (
            <Backdrop
              sx={{
                color: "#fff",
                marginLeft: open ? "240px" : "0px",
                marginTop: "64px",
              }}
              open={true}
            >
              <div className="flex flex-col items-center justify-center gap-3">
                <CircularProgress color="inherit" />
                Have patience, we are loading your data...
              </div>
            </Backdrop>
          ) : (
            <Outlet />
          )}
        </FacultyProtected>
      </Box>
    </Box>
  );
};

export default FacultyLayout;
