import {
  Analytics,
  ArrowForward,
  LocalHospital,
  People,
  Receipt,
  Refresh,
  Schedule,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Fade,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InsuranceService } from "../services/insurance.service";
import { TimetableService } from "../services/timetable.service";
import { TreatmentService } from "../services/treatment.service";

interface DashboardStats {
  totalPackages: number;
  totalSpecialists: number;
  totalTreatments: number;
  totalClaims: number;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalPackages: 0,
    totalSpecialists: 0,
    totalTreatments: 0,
    totalClaims: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [packages, specialists, treatments, claims] = await Promise.all([
        TreatmentService.getTreatmentPackages().catch(() => []),
        TreatmentService.getSpecialists().catch(() => []),
        TimetableService.getAllTreatmentPlans().catch(() => []),
        InsuranceService.getAllClaims().catch(() => []),
      ]);

      setStats({
        totalPackages: packages.length,
        totalSpecialists: specialists.length,
        totalTreatments: treatments.length,
        totalClaims: claims.length,
      });
    } catch (err: any) {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const statCards = [
    {
      title: "Treatment Packages",
      value: stats.totalPackages,
      icon: LocalHospital,
      color: "#0070F3",
      path: "/packages",
      gradient: "linear-gradient(135deg, #0070F3 0%, #3291FF 100%)",
    },
    {
      title: "Specialists",
      value: stats.totalSpecialists,
      icon: People,
      color: "#30D158",
      path: "/specialists",
      gradient: "linear-gradient(135deg, #30D158 0%, #5AC47A 100%)",
    },
    {
      title: "Active Treatments",
      value: stats.totalTreatments,
      icon: Schedule,
      color: "#FF9500",
      path: "/treatments",
      gradient: "linear-gradient(135deg, #FF9500 0%, #FFB340 100%)",
    },
    {
      title: "Insurance Claims",
      value: stats.totalClaims,
      icon: Receipt,
      color: "#FF3B30",
      path: "/claims",
      gradient: "linear-gradient(135deg, #FF3B30 0%, #FF6B6B 100%)",
    },
  ];

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
          Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          International Patient Treatment Management Overview
        </Typography>
        <Divider />
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3, borderRadius: 2 }}
          action={
            <Button color="inherit" size="small" onClick={loadDashboardData}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 4 }}>
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Box
              key={card.title}
              sx={{
                flex: {
                  xs: "1 1 100%",
                  sm: "1 1 calc(50% - 12px)",
                  md: "1 1 calc(25% - 18px)",
                },
              }}
            >
              <Fade in={true} timeout={600 + index * 200}>
                <Card
                  sx={{
                    height: "100%",
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                    },
                  }}
                  onClick={() => navigate(card.path)}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          background: card.gradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 2,
                        }}
                      >
                        <Icon sx={{ color: "white", fontSize: 24 }} />
                      </Box>
                      <IconButton
                        size="small"
                        sx={{ ml: "auto" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(card.path);
                        }}
                      >
                        <ArrowForward fontSize="small" />
                      </IconButton>
                    </Box>

                    <Typography
                      variant="h3"
                      component="div"
                      sx={{ fontWeight: 700, mb: 1 }}
                    >
                      {card.value}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: 500 }}
                    >
                      {card.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Box>
          );
        })}
      </Box>

      {/* Quick Actions */}
      <Fade in={true} timeout={1200}>
        <Paper
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            background: "linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)",
            border: "1px solid #e0e0e0",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, flexGrow: 1 }}>
              Quick Actions
            </Typography>
            <IconButton onClick={loadDashboardData}>
              <Refresh />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Box
              sx={{
                flex: {
                  xs: "1 1 100%",
                  sm: "1 1 calc(50% - 8px)",
                  md: "1 1 calc(25% - 12px)",
                },
              }}
            >
              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<LocalHospital />}
                onClick={() => navigate("/packages")}
                sx={{ py: 2, borderRadius: 2 }}
              >
                View Packages
              </Button>
            </Box>
            <Box
              sx={{
                flex: {
                  xs: "1 1 100%",
                  sm: "1 1 calc(50% - 8px)",
                  md: "1 1 calc(25% - 12px)",
                },
              }}
            >
              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<Schedule />}
                onClick={() => navigate("/treatments")}
                sx={{ py: 2, borderRadius: 2 }}
              >
                Schedule Treatment
              </Button>
            </Box>
            <Box
              sx={{
                flex: {
                  xs: "1 1 100%",
                  sm: "1 1 calc(50% - 8px)",
                  md: "1 1 calc(25% - 12px)",
                },
              }}
            >
              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<Receipt />}
                onClick={() => navigate("/claims")}
                sx={{ py: 2, borderRadius: 2 }}
              >
                Process Claim
              </Button>
            </Box>
            <Box
              sx={{
                flex: {
                  xs: "1 1 100%",
                  sm: "1 1 calc(50% - 8px)",
                  md: "1 1 calc(25% - 12px)",
                },
              }}
            >
              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<Analytics />}
                onClick={() => navigate("/analytics")}
                sx={{ py: 2, borderRadius: 2 }}
              >
                View Analytics
              </Button>
            </Box>
          </Box>
        </Paper>
      </Fade>

      {/* System Status */}
      <Fade in={true} timeout={1400}>
        <Card sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              System Status
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              <Box
                sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" } }}
              >
                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">
                      Authorization Service
                    </Typography>
                    <Chip label="Online" color="success" size="small" />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={100}
                    color="success"
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">Treatment Service</Typography>
                    <Chip label="Online" color="success" size="small" />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={100}
                    color="success"
                  />
                </Box>
              </Box>

              <Box
                sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" } }}
              >
                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">Insurance Service</Typography>
                    <Chip label="Online" color="success" size="small" />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={100}
                    color="success"
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">Timetable Service</Typography>
                    <Chip label="Online" color="success" size="small" />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={100}
                    color="success"
                  />
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default Dashboard;
