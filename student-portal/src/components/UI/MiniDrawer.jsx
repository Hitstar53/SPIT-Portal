import * as React from "react";
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
import './MiniDrawer.css'

const drawerWidth = 240;

const sidebardata = [
  {
    text: "Home",
    icon: <i class="fas fa-house"></i>,
  },
  {
    text: "Academics",
    icon: <i class="fas fa-graduation-cap"></i>,
  },
  {
    text: "Extra-Curricular",
    icon: <i class="fas fa-medal"></i>,
  },
  {
    text: "CareerConnect",
    icon: <i class="fas fa-users"></i>,
  },
  {
    text: "Faculty",
    icon: <i class="fas fa-chalkboard-user"></i>,
  }
];

const sidebarcontrols = [
    {
        text: "Theme",
        icon: <i class="fas fa-toggle-on"></i>,
    },
    {
        text: "Logout",
        icon: <i class="fas fa-sign-out-alt"></i>,
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
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  color: "#ffffff",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#1e1e1e",
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

export default function MiniDrawer() {
  const theme = useTheme({typography: {fontFamily: "Montserrat"}});
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
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
            align="flex-end"
            sx={{
                alignItems: "flex-end",
                px: 2.5,
                color: "#ffffff",
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
                lineHeight: 1.2,
            }}
          >
            <div style={{display: "flex", flexDirection: "column", textAlign: "right"}}>
            <p style={{ fontSize: 24}}>
                Hatim Sawai
            </p>
            <p style={{opacity:0.5, fontSize: 16}}>
                2021300108
            </p>
            </div>
            <img src={profile} alt="logo" style={{ width: 50, height: 50 }} />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer PaperProps={{ sx: {borderRight: "none"} }} variant="permanent" open={open} sx={{height:'100%'}}>
        <DrawerHeader sx={{ backgroundColor: "#1e1e1e"}}>
            <h1 style={{lineHeight: "1.2", display: "flex",alignItems: "center", gap: "1rem"}}>
                <img src={logo} alt="logo" style={{width: 50, height: 50}}/>
                <div>
                    <span style={{font: "Tahoma", fontSize: 18}}>SPIT</span>
                    <br />
                    <span style={{font: "Tahoma", fontSize: 14, marginRight: 20}}>Student Portal</span>
                </div>
            </h1>
          <IconButton
            sx={{ color: "#ffffff" }}
            onClick={handleDrawerClose}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
              <List sx={{ backgroundColor: "#1e1e1e", height: '100%', display: "flex", flexDirection: 'column', justifyContent: "space-between"}}>
            <List>
            {sidebardata.map((data, index) => (
                <ListItem key={data.text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        color: "#ffffff",
                        fontFamily: "'Montserrat', sans-serif"
                    }}
                >
                    <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "#ffffff",
                    }}
                    >
                        {data.icon}
                    </ListItemIcon>
                    <ListItemText primary={data.text} sx={{ width: 160, opacity: open ? 1 : 0 }} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
            <List>
            {sidebarcontrols.map((data, index) => (
                <ListItem key={data.text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                    sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: "#ffffff",
                    }}
                >
                    <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "#ffffff",
                    }}
                    >
                        {data.icon}
                    </ListItemIcon>
                    <ListItemText primary={data.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
        </List>
      </Drawer>    
    </Box>
  );
}
