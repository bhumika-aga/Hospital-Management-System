import {
  Dashboard,
  Help,
  LocalHospital,
  People,
  Receipt,
  Schedule,
  Settings,
} from "@mui/icons-material";
import {
  Box,
  Chip,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationItem } from "../../types";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navigationItems: NavigationItem[] = [
  { title: "Dashboard", path: "/dashboard", icon: Dashboard },
  { title: "Treatment Packages", path: "/packages", icon: LocalHospital },
  { title: "Specialists", path: "/specialists", icon: People },
  { title: "Treatment Plans", path: "/treatments", icon: Schedule },
  { title: "Insurance Claims", path: "/claims", icon: Receipt },
];

const secondaryItems: NavigationItem[] = [
  { title: "Settings", path: "/settings", icon: Settings },
  { title: "Help & Support", path: "/help", icon: Help },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid",
          borderColor: "divider",
          background: "linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            mb: 0.5,
          }}
        >
          Navigation
        </Typography>
        <Typography variant="body2" color="text.secondary">
          International Patient Management
        </Typography>
      </Box>

      {/* Main Navigation */}
      <Box sx={{ flexGrow: 1, overflow: "auto", py: 2 }}>
        <List sx={{ px: 2 }}>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <ListItem key={item.title} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    px: 2,
                    backgroundColor: active ? "primary.main" : "transparent",
                    color: active ? "primary.contrastText" : "text.primary",
                    "&:hover": {
                      backgroundColor: active ? "primary.dark" : "action.hover",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: active ? "primary.contrastText" : "text.secondary",
                      minWidth: 40,
                    }}
                  >
                    <Icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: "0.9rem",
                          fontWeight: active ? 600 : 500,
                        },
                      },
                    }}
                  />
                  {active && (
                    <Chip
                      size="small"
                      label="•"
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.2)",
                        color: "inherit",
                        width: 8,
                        height: 8,
                        "& .MuiChip-label": {
                          px: 0,
                          fontSize: "0.6rem",
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ mx: 2, my: 2 }} />

        {/* Secondary Navigation */}
        <List sx={{ px: 2 }}>
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <ListItem key={item.title} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    px: 2,
                    backgroundColor: active ? "primary.main" : "transparent",
                    color: active ? "primary.contrastText" : "text.secondary",
                    "&:hover": {
                      backgroundColor: active ? "primary.dark" : "action.hover",
                      color: "text.primary",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: active ? "primary.contrastText" : "text.secondary",
                      minWidth: 40,
                    }}
                  >
                    <Icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: "0.9rem",
                          fontWeight: active ? 600 : 500,
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          background: "linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)",
        }}
      >
        <Typography variant="caption" color="text.secondary" align="center">
          HealthSync v1.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
      sx={{
        width: 280,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
          borderRight: "1px solid",
          borderColor: "divider",
          background: "#ffffff",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
