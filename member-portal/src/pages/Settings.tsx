import { Language, Notifications, Security } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const Settings: React.FC = () => {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 1,
            background: "linear-gradient(135deg, #000000 0%, #757575 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Settings
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Manage your application preferences
        </Typography>
        <Divider />
      </Box>

      {/* Settings */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Application Settings
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Security />
              </ListItemIcon>
              <ListItemText
                primary="Security & Privacy"
                secondary="Manage your security settings and privacy preferences"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Notifications />
              </ListItemIcon>
              <ListItemText
                primary="Notifications"
                secondary="Configure notification preferences"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Language />
              </ListItemIcon>
              <ListItemText
                primary="Language & Region"
                secondary="Set your preferred language and regional settings"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;
