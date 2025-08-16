import {
  AccountCircle,
  Email,
  Login as LoginIcon,
  MedicalServices,
  PersonAdd,
  Phone,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fade,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import { LoginForm } from "../types";

interface CreateUserForm {
  username: string;
  fullName: string;
  email: string;
  phone: string;
  userType: "patient" | "doctor" | "admin" | "user";
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false);
  const [createUserSuccess, setCreateUserSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const {
    register: registerCreateUser,
    handleSubmit: handleSubmitCreateUser,
    formState: { errors: createUserErrors },
    reset: resetCreateUser,
  } = useForm<CreateUserForm>();

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

  const onCreateUser = async (data: CreateUserForm) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate user creation (since this is a demo system, we'll just store in localStorage)
      const userData = {
        username: data.username,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        userType: data.userType,
        createdAt: new Date().toISOString(),
      };

      // Store user data in localStorage (in a real system, this would be an API call)
      const existingUsers = JSON.parse(
        localStorage.getItem("hospitalUsers") || "[]"
      );

      // Check if username already exists
      if (existingUsers.some((user: any) => user.username === data.username)) {
        setError(
          "Username already exists. Please choose a different username."
        );
        setLoading(false);
        return;
      }

      existingUsers.push(userData);
      localStorage.setItem("hospitalUsers", JSON.stringify(existingUsers));

      setCreateUserSuccess(true);
      resetCreateUser();
      setTimeout(() => {
        setCreateUserDialogOpen(false);
        setCreateUserSuccess(false);
        setTabValue(0); // Switch back to login tab
      }, 2000);
    } catch (err: any) {
      setError("Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError(null);
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
                  HealthSync
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Advanced Hospital Management System
                </Typography>

                <Divider sx={{ maxWidth: 200, mx: "auto" }} />
              </Box>

              {/* Tabs */}
              <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  centered
                  variant="fullWidth"
                >
                  <Tab label="Sign In" icon={<LoginIcon />} />
                  <Tab label="Create Account" icon={<PersonAdd />} />
                </Tabs>
              </Box>

              {/* Login Form */}
              {tabValue === 0 && (
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
              )}

              {/* Create User Form */}
              {tabValue === 1 && (
                <Box>
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
                    Create New Account
                  </Typography>

                  {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                      {error}
                    </Alert>
                  )}

                  {createUserSuccess && (
                    <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                      Account created successfully! You can now sign in.
                    </Alert>
                  )}

                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    startIcon={<PersonAdd />}
                    onClick={() => setCreateUserDialogOpen(true)}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      borderColor: "primary.main",
                      color: "primary.main",
                      "&:hover": {
                        background: "rgba(0, 112, 243, 0.04)",
                        borderColor: "primary.dark",
                      },
                    }}
                  >
                    Create New User Account
                  </Button>

                  <Box sx={{ mt: 3, textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      Fill in your details to create a new account
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mt: 1 }}
                    >
                      Available roles: Patient, Doctor, Admin, User
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Fade>
      </Container>

      {/* Create User Dialog */}
      <Dialog
        open={createUserDialogOpen}
        onClose={() => setCreateUserDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <PersonAdd sx={{ color: "primary.main" }} />
            Create New User Account
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              {...registerCreateUser("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              error={!!createUserErrors.username}
              helperText={createUserErrors.username?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <AccountCircle sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              {...registerCreateUser("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Full name must be at least 2 characters",
                },
              })}
              error={!!createUserErrors.fullName}
              helperText={createUserErrors.fullName?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <AccountCircle sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              margin="normal"
              {...registerCreateUser("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!createUserErrors.email}
              helperText={createUserErrors.email?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <Email sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="Phone Number"
              margin="normal"
              {...registerCreateUser("phone", {
                required: "Phone number is required",
              })}
              error={!!createUserErrors.phone}
              helperText={createUserErrors.phone?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <Phone sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                },
              }}
            />

            <TextField
              select
              fullWidth
              label="User Type"
              margin="normal"
              defaultValue="patient"
              {...registerCreateUser("userType", {
                required: "User type is required",
              })}
              error={!!createUserErrors.userType}
              helperText={
                createUserErrors.userType?.message ||
                "Select your role in the system"
              }
            >
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
              <MenuItem value="admin">Administrator</MenuItem>
              <MenuItem value="user">General User</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateUserDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmitCreateUser(onCreateUser)}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <PersonAdd />}
          >
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Login;
