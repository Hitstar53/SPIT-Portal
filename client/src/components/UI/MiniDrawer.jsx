import * as React from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import MediaQuery, { useMediaQuery } from "react-responsive";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import logo from "../../assets/logo.png";
import profile from "../../assets/user.svg";
import "./MiniDrawer.css";
import { Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import moodle from "../../assets/moodle.png";

let drawerWidth = 275;

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const sidebardata = [
  {
    text: "Home",
    icon: <i className="fas fa-house"></i>,
    sub: [],
  },
  {
    text: "Academics",
    icon: <i className="fas fa-graduation-cap"></i>,
    sub: ["Courses", "Timetable", "Result"],
  },
  {
    text: "Extra-Curricular",
    icon: <i className="fas fa-medal"></i>,
    sub: ["Activities","Events","Committees"],
  },
  {
    text: "CareerConnect",
    icon: <i className="fas fa-users"></i>,
    sub: ["Portfolio", "Internships", "Placements"],
  },
  {
    text: "Faculty",
    icon: <i className="fas fa-chalkboard-user"></i>,
    sub: [],
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: "var(--text-light)",
  width: "100%",
  height: "4vh",
  padding: theme.spacing(0, 1),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "var(--bg-dark)",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ open,setOpen }) {
  const theme = useTheme({ typography: { fontFamily: "Montserrat" } });
  const [openSub, setOpenSub] = React.useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  // extract the () part from theme.breakpoints.down("sm")
  const extractedQuery = theme.breakpoints.down("sm").substring(7);
  const isMobile = useMediaQuery({ query: extractedQuery });

  React.useEffect(() => {
    if (isMobile) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isMobile]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenSub([false, false, false, false, false]);
  };

  function handleClick(index) {
    const arr = [...openSub];
    arr[index] = !arr[index];
    for (let i = 0; i < arr.length; i++) {
      if (i === index) continue;
      arr[i] = false;
    }
    setOpenSub(arr);
    setOpen(true);
  }

  const [checked, setChecked] = React.useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  React.useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      DarkMode();
      setChecked(true);
    } else {
      LightMode();
      setChecked(false);
    }
  }, []);

  const DarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  };
  const LightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  };

  const [name, setName] = React.useState("");
  const [uid, setUid] = React.useState("");
  const [picture, setPicture] = React.useState("");

  React.useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    console.log(JSON.parse(localStorage.getItem("userinfo")).email);
    const response = await fetch(
      "http://localhost:8000/api/student/getMiniDrawer",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: JSON.parse(localStorage.getItem("userinfo")).email,
        }),
      }
    );
    if (!response.ok) {
        console.log("error");
    }
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        setName(data.name);
        setUid(data.uid);
        if (data.photo) {
            setPicture(data.photo);
        } else {
            setPicture(profile);
        }
    }
  }

  React.useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userinfo"));
    setName(userInfo?.name);
    if (userInfo?.picture) {
      setPicture(userInfo?.picture);
    } else {
      setPicture(profile);
    }
  }, []);

  const toggleTheme = (event) => {
    if (event.target.checked) {
      DarkMode();
      setChecked(true);
    } else {
      LightMode();
      setChecked(false);
    }
  };

  const profileHandler = () => {
    navigate("/student/profile");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ height: "4rem" }} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            sx={{
              alignItems: "flex-end",
              px: 2.5,
              color: "var(--text-light)",
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
              lineHeight: 1.2,
            }}
          >
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "right",
              }}
            >
              {!isMobile && (
                <>
                  <span style={{ fontSize: 24 }}>{name}</span>
                  <span style={{ opacity: 0.5, fontSize: 16 }}>{uid}</span>
                </>
              )}
            </span>
            <img
              onClick={profileHandler}
              src={picture}
              alt="logo"
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        PaperProps={{ sx: { borderRight: "none" } }}
        variant="permanent"
        open={open}
      >
        <DrawerHeader sx={{ backgroundColor: "var(--bg-dark)" }}>
          <h1
            style={{
              lineHeight: "1.2",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img src={logo} alt="logo" style={{ width: 50, height: 50 }} />
            <span>
              <span style={{ fontSize: 18 }}>SPIT</span>
              <br />
              <span style={{ fontSize: 14, marginRight: 20 }}>
                Student Portal
              </span>
            </span>
          </h1>
          <IconButton
            sx={{ color: "var(--text-light)" }}
            onClick={handleDrawerClose}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List
          sx={{
            backgroundColor: "var(--bg-dark)",
            height: "96dvh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <List>
            {sidebardata.map((data, index) => (
              <div key={index}>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      color: "var(--text-light)",
                    }}
                    onClick={() => {
                      handleClick(index);
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "var(--text-light)",
                        pl: open ? 0.5 : "auto",
                      }}
                    >
                      {data.icon}
                    </ListItemIcon>
                    <Link
                      to={
                        index == 0 || index == 4
                          ? data.text.toLowerCase()
                          : location.pathname
                      }
                    >
                      {open ? (
                        <ListItemText
                          primary={data.text}
                          sx={{ width: 160, opacity: open ? 1 : 0 }}
                        />
                      ) : (
                        ""
                      )}
                    </Link>
                    {open ? (
                      index != 0 && index != 4 ? (
                        openSub[index] ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openSub[index]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {data.sub.map((heading, index2) => {
                      return (
                        <ListItemButton sx={{ pl: 8 }} key={index2}>
                          <Link to={"/student/" + heading.toLowerCase()}>
                            <ListItemText
                              sx={{ pl: 1, color: "var(--text-light)" }}
                              primary={heading}
                            />
                          </Link>
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </div>
            ))}
          </List>
          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: "var(--text-light)",
                }}
              >
                <ListItemText primary="Theme" sx={{ opacity: open ? 1 : 0 }} />
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    display: "flex",
                    justifyContent: "end",
                    color: "var(--text-light)",
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      sx={{ display: "flex", justifyContent: "center", m: 0 }}
                      control={
                        <MaterialUISwitch
                          checked={checked}
                          onChange={toggleTheme}
                          theme={theme}
                        />
                      }
                    />
                  </FormGroup>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: open ? "row" : "column",
                justifyContent: "center",
                gap: open ? "4rem" : "1rem",
              }}
            >
              {open ? (
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "var(--text-light)",
                    color: "var(--text-light)",
                    ":hover": {
                      borderColor: "var(--text-light)",
                      background: "var(--bg-light)",
                      color: "var(x`--text-dark)",
                    },
                  }}
                  disableElevation
                  onClick={() => {
                    localStorage.setItem("isLoggedIn", false);
                    localStorage.removeItem("userinfo");
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Fab
                  size="small"
                  color="primary"
                  sx={{
                    background: "var(--bg-dark)",
                    ":hover": {
                      borderColor: "var(--text-light)",
                      background: "var(--text-light)",
                      color: "var(--text-dark)",
                    },
                  }}
                  aria-label="add"
                  onClick={() => {
                    localStorage.setItem("isLoggedIn", false);
                    localStorage.removeItem("userinfo");
                    navigate("/");
                  }}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                </Fab>
              )}{" "}
              {open ? (
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "var(--text-light)",
                    color: "var(--text-light)",
                    ":hover": {
                      borderColor: "var(--text-light)",
                      background: "var(--bg-light)",
                      color: "var(--text-dark)",
                    },
                  }}
                  disableElevation
                >
                  <a target="_blank" href="https://moodle.spit.ac.in">
                    Moodle
                  </a>
                </Button>
              ) : (
                <Fab
                  sx={{ overflow: "hidden" }}
                  size="small"
                  color="secondary"
                  aria-label="add"
                >
                  <a target="_blank" href="https://moodle.spit.ac.in">
                    <img src={moodle} alt="moodle" />
                  </a>
                </Fab>
              )}
            </ListItem>
          </List>
        </List>
      </Drawer>
    </Box>
  );
}
