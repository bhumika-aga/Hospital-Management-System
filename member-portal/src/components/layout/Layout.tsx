import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const Layout: React.FC<LayoutProps> = ({ isDarkMode, onThemeToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDrawerClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Header
        onDrawerToggle={handleDrawerToggle}
        isDarkMode={isDarkMode}
        onThemeToggle={onThemeToggle}
      />

      <Sidebar open={sidebarOpen} onClose={handleDrawerClose} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          backgroundColor: "background.default",
          transition: theme.transitions.create(["margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar />
        <Box
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            maxWidth: "1400px",
            mx: "auto",
            width: "100%",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
