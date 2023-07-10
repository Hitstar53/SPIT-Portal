import { React, useState, useEffect,useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../assets/SPIT_Logo Colour.png';
import Tooltip from '@mui/material/Tooltip';
import { SideBarData } from '../data/SideBarData';
import { Button } from '@mui/material';
import '../styles/SideBar.css'
import {toast} from 'react-toastify'
import ArticleIcon from '@mui/icons-material/Article';
import { UserContext } from '../context/UserContext';
const drawerWidth = 240;

const openedMixin = (theme) => ({
    backgroundColor: "#1e1e1e",
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    backgroundColor: "#1e1e1e",
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    height: 68,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: "#1e1e1e",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    backgroundColor: "#1e1e1e",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer({setIsLoggedIn}) {
    const {user}=useContext(UserContext)
    const userInfo=JSON.parse(localStorage.getItem("userInfo"))
    const [active, setActive] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const Open = Boolean(anchorEl)
    const handleClick = (event) => {
        setActive(null)
        setAnchorEl(event.currentTarget);
    };
    const handleLogOut = () => {
        setIsLoggedIn(false);
        toast.success('Logged Out Successfull!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        localStorage.clear()
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const path = window.location.pathname;
        const activePage = SideBarData.find((item) => item.path === path);
        if (activePage) {
            setActive(activePage.title);
        }
    }, []);

    return (
        <div>
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
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className='nav-bar'>
                        <h4>Welcome to S.P.I.T Faculty Portal</h4>
                        <div>
                            <IconButton onClick={handleClick}>
                                <img src={userInfo.picture} alt="profile" className="profile-pic" />
                                <ArrowDropDownIcon sx={{ color: "white" }} />
                            </IconButton>
                            <Menu
                                id='demo-positioned-menu'
                                aria-labelledby='demo-positioned-button'
                                anchorEl={anchorEl}
                                open={Open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                MenuListProps={{
                                    'aria-labelledby': 'demo-positioned-button',
                                }}
                            >
                                <MenuItem onClick={() => { window.location.pathname = 'profile' }}><PersonIcon sx={{ marginRight: 1 }} />View Profile</MenuItem>
                                <MenuItem onClick={handleLogOut}><LogoutIcon sx={{ marginRight: 1 }} />Logout</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} >
                <DrawerHeader onClick={handleDrawerClose} sx={{ cursor: "pointer" }}>
                    <img src={Logo} alt="Img here" width="40px" className='spit-logo' />
                    <div style={{ color: "white", marginRight: "-10px", marginLeft: "5px" }}>S.P.I.T Faculty Portal </div>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon sx={{ color: "white" }} /> : <ChevronLeftIcon sx={{ color: "white" }} />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {SideBarData.map((val, index) => (
                        <ListItem key={val.title} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    backgroundColor: active === val.title ? '#333' : 'transparent',
                                    transition: 'background-color 0.3s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: active === val.title ? '#333' : '#555',
                                    },
                                }}
                                onClick={() => {
                                    window.location.pathname = val.path;
                                    setActive(val.title);
                                }}
                            >
                                {!open ? (<Tooltip title={val.title} placement="right" arrow>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}
                                    >
                                        {val.icon}
                                    </ListItemIcon>
                                </Tooltip>) :
                                    (<ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}
                                    >
                                        {val.icon}
                                    </ListItemIcon>)}
                                <ListItemText primary={val.title} sx={{ opacity: open ? 1 : 0, color: "white" }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    {user.designation==="HOD"&&<ListItem key={"Dept Appraisal"} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    backgroundColor: active === "Dept Appraisal" ? '#333' : 'transparent',
                                    transition: 'background-color 0.3s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: active === "Dept Appraisal" ? '#333' : '#555',
                                    },
                                }}
                                onClick={() => {
                                    window.location.pathname = "/dept_appraisal";
                                    setActive("Dept Appraisal");
                                }}
                            >
                                {!open ? (<Tooltip title={"Dept Appraisal"} placement="right" arrow>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}
                                    >
                                        {<ArticleIcon/>}
                                    </ListItemIcon>
                                </Tooltip>) :
                                    (<ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}
                                    >
                                        {<ArticleIcon/>}
                                    </ListItemIcon>)}
                                <ListItemText primary={"Dept Appraisal"} sx={{ opacity: open ? 1 : 0, color: "white" }} />
                            </ListItemButton>
                        </ListItem>}
                </List>
            </Drawer>
        </div>
    );
}