import { Login as LoginIcon, MedicalServices } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Fade,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import { LoginForm } from "../types";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError(null);

    try {
      const response = await AuthService.generateToken({
        username: data.username,
      });
      AuthService.setToken(response.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        },
      }}
    >
      <Container maxWidth="sm">
        <Fade in={true} timeout={800}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              backdropFilter: "blur(20px)",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              overflow: "visible",
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
              {/* Logo and Title */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #000000 0%, #0070F3 100%)",
                    mb: 3,
                    mx: "auto",
                  }}
                >
                  <MedicalServices sx={{ fontSize: 40, color: "white" }} />
                </Box>

                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    background:
                      "linear-gradient(135deg, #000000 0%, #0070F3 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1,
                  }}
                >
                  MediFlow
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  International Patient Treatment Management
                </Typography>

                <Divider sx={{ maxWidth: 200, mx: "auto" }} />
              </Box>

              {/* Login Form */}
              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: 600,
                    textAlign: "center",
                    mb: 3,
                    color: "text.primary",
                  }}
                >
                  Welcome Back
                </Typography>

                {error && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {error}
                  </Alert>
                )}

                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  margin="normal"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 2,
                      message: "Username must be at least 2 characters",
                    },
                  })}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <LoginIcon />
                  }
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    background:
                      "linear-gradient(135deg, #000000 0%, #333333 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #333333 0%, #555555 100%)",
                      transform: "translateY(-1px)",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.25)",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>

                {/* Additional Info */}
                <Box sx={{ mt: 4, textAlign: "center" }}>
                  <Typography variant="body2" color="text.secondary">
                    Use any username to access the system
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mt: 1 }}
                  >
                    Demo credentials: admin, user, doctor, patient
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login;
