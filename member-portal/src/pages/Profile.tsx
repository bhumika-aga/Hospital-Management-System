import {
  Email,
  Phone,
  Save,
  Edit,
  Security,
  Person,
  LocationOn,
  CalendarToday,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface UserProfile {
  username: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  membershipId: string;
  membershipType: 'Basic' | 'Premium' | 'VIP';
  joinDate: string;
  emergencyContact: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    username: localStorage.getItem('username') || 'user',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: '123 Health Street, Medical City, MC 110001',
    dateOfBirth: '1990-01-15',
    membershipId: 'HM2024001',
    membershipType: 'Premium',
    joinDate: '2024-01-01',
    emergencyContact: '+91 98765 43211',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: profile,
  });

  useEffect(() => {
    reset(profile);
  }, [profile, reset]);

  const onSubmit = (data: UserProfile) => {
    setProfile(data);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCancelEdit = () => {
    reset(profile);
    setIsEditing(false);
  };

  const getMembershipColor = (type: string) => {
    switch (type) {
      case 'VIP':
        return 'error';
      case 'Premium':
        return 'warning';
      default:
        return 'primary';
    }
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
            background: "linear-gradient(135deg, #000000 0%, #FF3B30 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          My Profile
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Manage your account information and preferences
        </Typography>
      </Box>

      {saveSuccess && (
        <Alert
          severity="success"
          sx={{ mb: 3, borderRadius: 2 }}
          onClose={() => setSaveSuccess(false)}
        >
          Profile updated successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Header Card */}
        <Grid size={12}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: 'primary.main',
                    fontSize: '2.5rem',
                    fontWeight: 600,
                  }}
                >
                  {profile.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                    {profile.fullName}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                    @{profile.username}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Chip
                      label={`${profile.membershipType} Member`}
                      color={getMembershipColor(profile.membershipType) as any}
                      variant="outlined"
                      size="medium"
                    />
                    <Typography variant="body2" color="text.secondary">
                      ID: {profile.membershipId}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  {!isEditing ? (
                    <Button
                      variant="contained"
                      startIcon={<Edit />}
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={handleSubmit(onSubmit)}
                        disabled={!isDirty}
                      >
                        Save
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Personal Information */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Personal Information
              </Typography>
              
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="fullName"
                    control={control}
                    rules={{ required: 'Full name is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Full Name"
                        disabled={!isEditing}
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                        slotProps={{
                          input: {
                            startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Email Address"
                        disabled={!isEditing}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        slotProps={{
                          input: {
                            startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{ required: 'Phone number is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Phone Number"
                        disabled={!isEditing}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        slotProps={{
                          input: {
                            startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    rules={{ required: 'Date of birth is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Date of Birth"
                        type="date"
                        disabled={!isEditing}
                        error={!!errors.dateOfBirth}
                        helperText={errors.dateOfBirth?.message}
                        slotProps={{
                          input: {
                            startAdornment: <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />,
                          },
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid size={12}>
                  <Controller
                    name="address"
                    control={control}
                    rules={{ required: 'Address is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Address"
                        multiline
                        rows={3}
                        disabled={!isEditing}
                        error={!!errors.address}
                        helperText={errors.address?.message}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <LocationOn sx={{ mr: 1, color: 'text.secondary', alignSelf: 'flex-start', mt: 0.5 }} />
                            ),
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid size={12}>
                  <Controller
                    name="emergencyContact"
                    control={control}
                    rules={{ required: 'Emergency contact is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Emergency Contact"
                        disabled={!isEditing}
                        error={!!errors.emergencyContact}
                        helperText={errors.emergencyContact?.message}
                        slotProps={{
                          input: {
                            startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Account Information */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Account Information
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Username
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {profile.username}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Member Since
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {new Date(profile.joinDate).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Membership Type
                </Typography>
                <Chip
                  label={profile.membershipType}
                  color={getMembershipColor(profile.membershipType) as any}
                  variant="outlined"
                  size="small"
                  sx={{ mt: 0.5 }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />
              
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Security />}
                onClick={() => setPasswordDialogOpen(true)}
                sx={{ mb: 2 }}
              >
                Change Password
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Change Password Dialog */}
      <Dialog
        open={passwordDialogOpen}
        onClose={() => setPasswordDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              margin="normal"
            />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setPasswordDialogOpen(false)}>
            Update Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;