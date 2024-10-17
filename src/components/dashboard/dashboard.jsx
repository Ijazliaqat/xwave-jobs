// react imports
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// MUI imports
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Drawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

// Custom imports
import HeaderLogo from "../../assets/header-logo.svg";
import { sideBar } from "./helper/data";
import { Link } from "react-router-dom";

const DashboardDrawer = (props) => {
  const drawerWidth = 280;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeIndex, setActiveIndex] = useState("home");

  const [expanded, setExpanded] = useState("");

  const userDetails = localStorage.getItem("token");

  // Convert the JSON string back to an object
  const { user } = JSON.parse(userDetails);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div class={"p-2"}>
      <img src={HeaderLogo} alt="xWave Logo" />

      <div className="mt-4">
        {sideBar?.map((item) => {
          return (
            <>
              <Accordion
                sx={{ boxShadow: "none", border: "1px solid #E6E6E6" }}
                className="my-5"
                expanded={expanded === item?.panel}
                onChange={handleChange(item?.panel)}
              >
                <AccordionSummary
                  expandIcon={
                    expanded === item?.panel ? (
                      <ExpandMoreIcon />
                    ) : (
                      <ExpandLessIcon />
                    )
                  }
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography>{item?.tittle} </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {item?.options?.map((option) => {
                      return (
                        <>
                          <FormControlLabel
                            control={<Checkbox checked={option?.checkBox} />}
                            label={option?.value}
                          />
                        </>
                      );
                    })}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            </>
          );
        })}
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ ml: 2, display: { xs: "block", md: "none", sm: "block" } }}
      >
        <MenuOpenIcon sx={{ color: "#1A1B4B" }} />
      </IconButton>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "#fff",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <div className="flex justify-between w-full">
            <div className="flex justify-end w-full">
              <Link to="/user/dashboard">
                <Button
                  sx={
                    activeIndex === "home" && {
                      backgroundColor: "#1A1B4B",
                      "&:hover": {
                        backgroundColor: "#1A1B4B",
                      },
                      textTransform: "capitalize",
                      cursor: "pointer",
                      fontWeight: "bold",
                      color: "#fff",
                    }
                  }
                  onClick={() => {
                    setActiveIndex("home");
                  }}
                >
                  Home
                </Button>
              </Link>
              <Link to="/user/my-jobs">
                <Button
                  sx={
                    activeIndex === "jobs" && {
                      backgroundColor: "#1A1B4B",
                      "&:hover": {
                        backgroundColor: "#08008F",
                      },
                      textTransform: "capitalize",
                      cursor: "pointer",
                      fontWeight: "bold",
                      color: "#fff",
                    }
                  }
                  onClick={() => {
                    setActiveIndex("jobs");
                  }}
                >
                  My Jobs
                </Button>
              </Link>
              {user?.isAdmin && (
                <Link to="/user/list">
                  <Button
                    sx={
                      activeIndex === "users" && {
                        backgroundColor: "#1A1B4B",
                        "&:hover": {
                          backgroundColor: "#1A1B4B",
                        },
                        textTransform: "capitalize",
                        cursor: "pointer",
                        fontWeight: "bold",
                        color: "#fff",
                      }
                    }
                    onClick={() => {
                      setActiveIndex("users");
                    }}
                  >
                    Users
                  </Button>
                </Link>
              )}

              {user?.isAdmin && (
                <Link to="/user/post-job">
                  <Button
                    sx={
                      activeIndex === "post-job" && {
                        backgroundColor: "#1A1B4B",
                        "&:hover": {
                          backgroundColor: "#1A1B4B",
                        },
                        textTransform: "capitalize",
                        cursor: "pointer",
                        fontWeight: "bold",
                        color: "#fff",
                      }
                    }
                    onClick={() => {
                      setActiveIndex("post-job");
                    }}
                  >
                    Post Job
                  </Button>
                </Link>
              )}
              {user?.isAdmin && (
                <Link to="/user/sign-up">
                  <Button
                    sx={
                      activeIndex === "create-user" && {
                        backgroundColor: "#1A1B4B",
                        "&:hover": {
                          backgroundColor: "#1A1B4B",
                        },
                        textTransform: "capitalize",
                        cursor: "pointer",
                        fontWeight: "bold",
                        color: "#fff",
                      }
                    }
                    onClick={() => {
                      setActiveIndex("create-user");
                    }}
                  >
                    Create User
                  </Button>
                </Link>
              )}
              <Link to="/user/profile-details">
                <Avatar alt="Profile Avatar" src={""} className="ml-6" />
              </Link>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            // display: { xs: "block", sm: "none" },
            display: { xs: "block", sm: "block", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            // display: { xs: "none", sm: "block" },
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default DashboardDrawer;
