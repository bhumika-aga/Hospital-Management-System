import { People, Phone, Refresh, Schedule, Star } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TreatmentService } from "../services/treatment.service";
import { Specialist } from "../types";

const Specialists: React.FC = () => {
  const navigate = useNavigate();
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSpecialists = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await TreatmentService.getSpecialists();
      setSpecialists(data);
    } catch (err: any) {
      setError("Failed to load specialists");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSpecialists();
  }, []);

  const handleContactSpecialist = (specialist: Specialist) => {
    // Create a mailto link with pre-filled subject and body
    const subject = encodeURIComponent(
      `Appointment Request - Dr. ${specialist.name}`,
    );
    const body = encodeURIComponent(
      `Dear Dr. ${specialist.name},\n\nI would like to schedule an appointment for consultation.\n\nSpecialization: ${specialist.specialization}\nContact: ${specialist.contactNumber}\n\nThank you for your time.\n\nBest regards`,
    );

    // Try to open email client, fallback to phone number if no email
    if (specialist.email) {
      window.location.href = `mailto:${specialist.email}?subject=${subject}&body=${body}`;
    } else {
      // If no email, show phone number contact
      window.open(`tel:${specialist.contactNumber}`);
    }
  };

  const handleBookAppointment = (specialist: Specialist) => {
    // Store selected specialist info in sessionStorage and navigate to treatments
    sessionStorage.setItem("selectedSpecialist", JSON.stringify(specialist));
    navigate("/treatments");
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
            background: "linear-gradient(135deg, #000000 0%, #30D158 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Medical Specialists
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Expert healthcare professionals across specializations
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Divider sx={{ flexGrow: 1 }} />
          <IconButton onClick={loadSpecialists}>
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3, borderRadius: 2 }}
          action={
            <Button color="inherit" size="small" onClick={loadSpecialists}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* Specialists Grid */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {specialists.map((specialist) => (
          <Box
            key={specialist.id}
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
                {/* Header with Avatar */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      mr: 2,
                      background:
                        specialist.level === "SENIOR"
                          ? "linear-gradient(135deg, #FF9500 0%, #FFB340 100%)"
                          : "linear-gradient(135deg, #30D158 0%, #5AC47A 100%)",
                      fontSize: "1.5rem",
                      fontWeight: 600,
                    }}
                  >
                    {specialist.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Dr. {specialist.name}
                    </Typography>
                    <Chip
                      label={specialist.level}
                      size="small"
                      color={
                        specialist.level === "SENIOR" ? "warning" : "success"
                      }
                      sx={{ mb: 0.5 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {specialist.specialization}
                    </Typography>
                  </Box>
                </Box>

                {/* Experience Rating */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Star sx={{ mr: 1, color: "#FFD700", fontSize: 20 }} />
                  <Rating
                    value={Math.min(specialist.experience / 2, 5)}
                    readOnly
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    ({specialist.experience} years)
                  </Typography>
                </Box>

                {/* Details */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Phone
                      sx={{ mr: 1, color: "text.secondary", fontSize: 18 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Contact:
                    </Typography>
                    <Typography variant="body1" sx={{ ml: 1, fontWeight: 500 }}>
                      {specialist.contactNumber}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Star
                      sx={{ mr: 1, color: "text.secondary", fontSize: 18 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Qualification:
                    </Typography>
                    <Typography variant="body1" sx={{ ml: 1, fontWeight: 500 }}>
                      {specialist.qualification}
                    </Typography>
                  </Box>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Phone />}
                    onClick={() => handleContactSpecialist(specialist)}
                    sx={{ flex: 1 }}
                  >
                    Contact
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Schedule />}
                    onClick={() => handleBookAppointment(specialist)}
                    sx={{ flex: 1 }}
                  >
                    Book
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {specialists.length === 0 && !loading && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <People sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No specialists found
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Specialists;
