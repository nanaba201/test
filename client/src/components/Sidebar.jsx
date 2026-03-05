import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  IconButton,
  AppBar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UserIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import FeeIcon from "@mui/icons-material/AttachMoney";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import edenLogo from "../assets/eden-logo.png";

const drawerWidth = 240;

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const location = useLocation();

  // Get user role from Cookies
  const userRole = Cookies.get("userRole"); // Possible values: "student", "teacher", "admin"

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      Cookies.remove("authToken");
      Cookies.remove("userRole");
      navigate("/online/login");
      toast.warning("Logout Successfully!");
    }
  };

  // Define menu items based on user role
  const baseMenuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: `/${userRole}-dashboard` },
  ];

  const studentMenuItems = [
    { text: "Result", icon: <InfoIcon />, path: "/student-dashboard/result" },
    { text: "Fees", icon: <FeeIcon />, path: "/student-dashboard/feedetails" },
    {
      text: "T/C",
      icon: <NewspaperIcon />,
      path: "/student-dashboard/transferCertificate",
    },
  ];

  const teacherMenuItems = [
    // {
    //   text: "Users",
    //   icon: <UserIcon />,
    //   path: "/teacher-dashboard/addNewUser",
    // },
    // {
    //   text: "Class",
    //   icon: <SettingsIcon />,
    //   path: "/teacher-dashboard/addclass",
    // },
    { text: "Result", icon: <InfoIcon />, path: "/teacher-dashboard/result" },
  ];

  const adminMenuItems = [
    { text: "Users", icon: <UserIcon />, path: "/admin-dashboard/addNewUser" },
    {
      text: "Class",
      icon: <SettingsIcon />,
      path: "/admin-dashboard/addclass",
    },
    { text: "Forms", icon: <FeeIcon />, path: "/admin-dashboard/formDetails" },
    { text: "Fees", icon: <FeeIcon />, path: "/admin-dashboard/feedetails" },
    { text: "Result", icon: <InfoIcon />, path: "/admin-dashboard/result" },
    {
      text: "T/C",
      icon: <NewspaperIcon />,
      path: "/admin-dashboard/transferCertificate",
    },
  ];

  let menuItems = [...baseMenuItems];

  if (userRole === "student") {
    menuItems = [...studentMenuItems];
  } else if (userRole === "teacher") {
    menuItems = [...menuItems, ...teacherMenuItems];
  } else if (userRole === "admin") {
    menuItems = [...menuItems, ...adminMenuItems];
  }

  // Add Logout option for all users
  menuItems.push({
    text: "Logout",
    icon: <LogoutIcon />,
    onClick: handleLogout,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (!isDesktop) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <img
        src={edenLogo}
        alt="Eden International School"
        style={{ width: 120, height: "auto" }}
      />
      <Toolbar />
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginTop: 10,
          marginLeft: 10,
        }}
      >
        MENU
      </div>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() =>
              item.onClick ? item.onClick() : handleNavigation(item.path)
            }
            sx={{
              backgroundColor:
                location.pathname === item.path ? "#1976d2" : "transparent",
              color: location.pathname === item.path ? "white" : "black",
              "&:hover": { backgroundColor: "#bbdefb" },
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.path ? "white" : "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      {!isDesktop && (
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
      <nav>
        <Drawer
          variant={isDesktop ? "permanent" : "temporary"}
          open={isDesktop || mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default Sidebar;
