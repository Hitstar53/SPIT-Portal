import React, { useState, useEffect } from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import { Box } from "@mui/system";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Classes from "./pages/Classes";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import MiniProj from "./pages/MiniProj";
import Appraisal from "./pages/Appraisal";
import ViewProfile from "./pages/ViewProfile";
import Login from "./pages/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("loggedin")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      {isLoggedIn ? (
        <Box sx={{ display: "flex" }}>
          <SideBar setIsLoggedIn={setIsLoggedIn} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: "#F5F6FA",
              marginTop: 8,
              overflowX: "hidden",
            }}
          >
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<ViewProfile />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/leaves" element={<Leaves />} />
                <Route path="/mini-proj" element={<MiniProj />} />
                <Route path="/appraisal" element={<Appraisal />} />
              </Routes>
            </Router>
          </Box>
        </Box>
      ) : (
        <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
};

export default App;
