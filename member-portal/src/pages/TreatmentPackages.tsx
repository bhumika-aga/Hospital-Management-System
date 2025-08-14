import {
  AttachMoney,
  LocalHospital,
  Refresh,
  Schedule,
  Visibility,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TreatmentService } from "../services/treatment.service";
import { TreatmentPackage } from "../types";

const TreatmentPackages: React.FC = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<TreatmentPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] =
    useState<TreatmentPackage | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const loadPackages = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await TreatmentService.getTreatmentPackages();
      setPackages(data);
    } catch (err: any) {
      setError("Failed to load treatment packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const handleViewDetails = (pkg: TreatmentPackage) => {
    setSelectedPackage(pkg);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedPackage(null);
  };

  const handleSelectPackage = (pkg: TreatmentPackage) => {
    // Store selected package in sessionStorage for the Treatments page
    sessionStorage.setItem('selectedPackage', JSON.stringify(pkg));
    // Navigate to treatments page
    navigate('/treatments');
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

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
            background: "linear-gradient(135deg, #000000 0%, #0070F3 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Treatment Packages
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Comprehensive treatment packages for different specializations
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Divider sx={{ flexGrow: 1 }} />
          <IconButton onClick={loadPackages}>
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3, borderRadius: 2 }}
          action={
            <Button color="inherit" size="small" onClick={loadPackages}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* Treatment Packages Grid */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {packages.map((pkg) => (
          <Box
            key={pkg.id}
            sx={{
              flex: {
                xs: "1 1 100%",
                md: "1 1 calc(50% - 12px)",
                lg: "1 1 calc(33.333% - 16px)",
              },
            }}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                {/* Header */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      background:
                        "linear-gradient(135deg, #0070F3 0%, #3291FF 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                    }}
                  >
                    <LocalHospital sx={{ color: "white", fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {pkg.name}
                    </Typography>
                    <Chip
                      label={pkg.specialization}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                </Box>

                {/* Details */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <AttachMoney
                      sx={{ mr: 1, color: "text.secondary", fontSize: 18 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Total Cost:
                    </Typography>
                    <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
                      ₹{pkg.cost.toLocaleString()}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Schedule
                      sx={{ mr: 1, color: "text.secondary", fontSize: 18 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Duration:
                    </Typography>
                    <Typography variant="body1" sx={{ ml: 1, fontWeight: 500 }}>
                      {pkg.durationWeeks} weeks
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2 }}
                  >
                    <strong>Package Level:</strong> Level {pkg.packageLevel}
                  </Typography>
                </Box>

                {/* Tests */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    Included Tests:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {pkg.tests.map((test, index) => (
                      <Chip
                        key={index}
                        label={test}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.75rem" }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Action Button */}
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Visibility />}
                  onClick={() => handleViewDetails(pkg)}
                  sx={{ mt: "auto" }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {packages.length === 0 && !loading && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <LocalHospital sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No treatment packages found
          </Typography>
        </Box>
      )}

      {/* Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
      >
        {selectedPackage && (
          <>
            <DialogTitle>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocalHospital sx={{ mr: 2, color: "primary.main" }} />
                <Box>
                  <Typography variant="h5">{selectedPackage.name}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {selectedPackage.specialization}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>

            <DialogContent>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                <Box
                  sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" } }}
                >
                  <Typography variant="h6" gutterBottom>
                    Package Cost
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="Total Package Cost"
                        secondary={
                          <Typography variant="h6" color="primary">
                            ₹{selectedPackage.cost.toLocaleString()}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Package Level"
                        secondary={`Level ${selectedPackage.packageLevel}`}
                      />
                    </ListItem>
                  </List>
                </Box>

                <Box
                  sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" } }}
                >
                  <Typography variant="h6" gutterBottom>
                    Package Details
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="Duration"
                        secondary={`${selectedPackage.durationWeeks} weeks`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Specialization"
                        secondary={selectedPackage.specialization}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Included Tests"
                        secondary={selectedPackage.tests.join(", ")}
                      />
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleCloseDetails}>Close</Button>
              <Button 
                variant="contained" 
                onClick={() => handleSelectPackage(selectedPackage!)}
              >
                Select Package
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default TreatmentPackages;
