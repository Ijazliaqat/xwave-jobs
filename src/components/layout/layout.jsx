import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardDrawer from "../dashboard/dashboard";

const Layout = () => {
  const navigate = useNavigate();


  return (
    <Box sx={{ paddingLeft: { sm: 0, md: 35 } }}>
      <DashboardDrawer />
      <Outlet />
    </Box>
  );
};

export default Layout;
