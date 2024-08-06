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
  const [activeIndex, setActiveIndex] = useState(0);

  const [expanded, setExpanded] = useState("");

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

  const handleListItemClick = (index) => {
    setActiveIndex(index);
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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuOpenIcon sx={{ color: "#099309" }} />
          </IconButton>

          <div className="flex justify-between w-full">
            <div className="flex justify-end w-full">
              <Link to="/user/dashboard">
                <Button>Home</Button>
              </Link>
              <Link to="/user/my-jobs">
                <Button>My Jobs</Button>
              </Link>
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
            display: { xs: "block", sm: "none" },
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
            display: { xs: "none", sm: "block" },
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
