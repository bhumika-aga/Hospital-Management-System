import {
  Backup,
  CloudDownload,
  DarkMode,
  Delete,
  Email,
  Language,
  LightMode,
  Security,
  Sms,
  VolumeUp,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    darkMode: localStorage.getItem("theme") === "dark",
    emailNotifications: true,
    smsNotifications: false,
    soundNotifications: true,
    language: "en",
    autoSave: true,
    dataRetention: "1year",
  });

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [clearDataDialog, setClearDataDialog] = useState(false);

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));

    // Handle theme change immediately
    if (key === "darkMode") {
      localStorage.setItem("theme", value ? "dark" : "light");
      window.location.reload(); // Refresh to apply theme
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleExportData = () => {
    const data = {
      settings,
      profile: localStorage.getItem("username"),
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hospital-data-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    localStorage.clear();
    setClearDataDialog(false);
    alert("All data cleared successfully. You will be redirected to login.");
    window.location.href = "/login";
  };

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
          Manage your application preferences and data
        </Typography>
      </Box>

      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          Settings updated successfully!
        </Alert>
      )}

      {/* Theme Settings */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Appearance
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                {settings.darkMode ? <DarkMode /> : <LightMode />}
              </ListItemIcon>
              <ListItemText
                primary="Dark Mode"
                secondary="Toggle between light and dark theme"
              />
              <Switch
                checked={settings.darkMode}
                onChange={(e) =>
                  handleSettingChange("darkMode", e.target.checked)
                }
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Notifications
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              <ListItemText
                primary="Email Notifications"
                secondary="Receive updates and alerts via email"
              />
              <Switch
                checked={settings.emailNotifications}
                onChange={(e) =>
                  handleSettingChange("emailNotifications", e.target.checked)
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Sms />
              </ListItemIcon>
              <ListItemText
                primary="SMS Notifications"
                secondary="Receive important alerts via SMS"
              />
              <Switch
                checked={settings.smsNotifications}
                onChange={(e) =>
                  handleSettingChange("smsNotifications", e.target.checked)
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <VolumeUp />
              </ListItemIcon>
              <ListItemText
                primary="Sound Notifications"
                secondary="Play sounds for notifications"
              />
              <Switch
                checked={settings.soundNotifications}
                onChange={(e) =>
                  handleSettingChange("soundNotifications", e.target.checked)
                }
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Language & Region
          </Typography>
          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <Language sx={{ color: "primary.main" }} />
            <TextField
              select
              label="Language"
              value={settings.language}
              onChange={(e) => handleSettingChange("language", e.target.value)}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="hi">हिन्दी (Hindi)</MenuItem>
              <MenuItem value="ta">தமிழ் (Tamil)</MenuItem>
              <MenuItem value="te">తెలుగు (Telugu)</MenuItem>
              <MenuItem value="bn">বাংলা (Bengali)</MenuItem>
            </TextField>
            <Chip label="Current" color="primary" size="small" />
          </Box>
        </CardContent>
      </Card>

      {/* Security & Privacy */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Security & Privacy
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Backup />
              </ListItemIcon>
              <ListItemText
                primary="Auto-Save Data"
                secondary="Automatically save form data as you type"
              />
              <Switch
                checked={settings.autoSave}
                onChange={(e) =>
                  handleSettingChange("autoSave", e.target.checked)
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Security />
              </ListItemIcon>
              <ListItemText
                primary="Data Retention"
                secondary="How long to keep your data stored"
              />
              <TextField
                select
                value={settings.dataRetention}
                onChange={(e) =>
                  handleSettingChange("dataRetention", e.target.value)
                }
                sx={{ minWidth: 150 }}
                size="small"
              >
                <MenuItem value="30days">30 Days</MenuItem>
                <MenuItem value="3months">3 Months</MenuItem>
                <MenuItem value="1year">1 Year</MenuItem>
                <MenuItem value="forever">Forever</MenuItem>
              </TextField>
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Data Management
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              startIcon={<CloudDownload />}
              onClick={handleExportData}
            >
              Export Data
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={() => setClearDataDialog(true)}
            >
              Clear All Data
            </Button>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Export your data for backup or transfer. Clear all data will remove
            everything and log you out.
          </Typography>
        </CardContent>
      </Card>

      {/* Clear Data Confirmation Dialog */}
      <Dialog
        open={clearDataDialog}
        onClose={() => setClearDataDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Clear All Data</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to clear all your data? This action cannot be
            undone and you will be logged out.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClearDataDialog(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleClearData}>
            Clear All Data
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;
