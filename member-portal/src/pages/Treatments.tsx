import {
  AccessTime,
  Add,
  CalendarToday,
  LocalHospital,
  Person,
  Refresh,
  Schedule,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
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
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TimetableService } from "../services/timetable.service";
import { TreatmentService } from "../services/treatment.service";
import { PatientForm, TreatmentPackage, TreatmentPlan } from "../types";

const Treatments: React.FC = () => {
  const [treatments, setTreatments] = useState<TreatmentPlan[]>([]);
  const [packages, setPackages] = useState<TreatmentPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PatientForm>({
    defaultValues: {
      patientName: "",
      age: 0,
      ailmentDetails: "",
      treatmentPackageId: 0,
      treatmentCommencementDate: "",
    },
  });

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [treatmentsData, packagesData] = await Promise.all([
        TimetableService.getAllTreatmentPlans(),
        TreatmentService.getTreatmentPackages(),
      ]);
      setTreatments(treatmentsData);
      setPackages(packagesData);
    } catch (err: any) {
      setError("Failed to load treatment data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = async (data: PatientForm) => {
    setSubmitting(true);
    try {
      const patientDetail = {
        ...data,
        treatmentPackageId: Number(data.treatmentPackageId),
      };
      const newTreatment = await TimetableService.generateTimetable(
        patientDetail
      );
      setTreatments([...treatments, newTreatment]);
      setDialogOpen(false);
      reset();
    } catch (err: any) {
      setError("Failed to create treatment plan");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    return end > now ? "success" : "default";
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
            background: "linear-gradient(135deg, #000000 0%, #FF9500 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Treatment Plans
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Manage patient treatment schedules and timetables
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setDialogOpen(true)}
          >
            New Treatment
          </Button>
          <Divider sx={{ flexGrow: 1 }} />
          <IconButton onClick={loadData}>
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3, borderRadius: 2 }}
          action={
            <Button color="inherit" size="small" onClick={loadData}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* Treatment Plans Grid */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {treatments.map((treatment) => (
          <Box
            key={treatment.id}
            sx={{ flex: { xs: "1 1 100%", lg: "1 1 calc(50% - 12px)" } }}
          >
            <Card
              sx={{
                height: "100%",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Header */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      mr: 2,
                      background:
                        "linear-gradient(135deg, #FF9500 0%, #FFB340 100%)",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                    }}
                  >
                    {(treatment.patientName || treatment.name || "")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {treatment.patientName || treatment.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Age: {treatment.age} years
                    </Typography>
                  </Box>
                  <Chip
                    label={
                      getStatusColor(
                        treatment.treatmentEndDate || new Date().toISOString()
                      ) === "success"
                        ? "Active"
                        : "Completed"
                    }
                    color={getStatusColor(
                      treatment.treatmentEndDate || new Date().toISOString()
                    )}
                    size="small"
                  />
                </Box>

                {/* Treatment Details */}
                <Paper sx={{ p: 2, mb: 2, bgcolor: "background.default" }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <LocalHospital
                      sx={{ mr: 1, color: "primary.main", fontSize: 18 }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {treatment.treatmentPackage?.name ||
                        treatment.treatmentPackageName}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {treatment.ailmentDetails || treatment.ailment}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CalendarToday
                          sx={{ mr: 1, color: "text.secondary", fontSize: 16 }}
                        />
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Start Date
                          </Typography>
                          <Typography variant="body2">
                            {new Date(
                              treatment.treatmentCommencementDate ||
                                treatment.treatmentStartDate ||
                                new Date()
                            ).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccessTime
                          sx={{ mr: 1, color: "text.secondary", fontSize: 16 }}
                        />
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            End Date
                          </Typography>
                          <Typography variant="body2">
                            {new Date(
                              treatment.treatmentEndDate || new Date()
                            ).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Paper>

                {/* Specialist Info */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Person
                    sx={{ mr: 1, color: "text.secondary", fontSize: 18 }}
                  />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Dr. {treatment.specialist?.name || "Not Assigned"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {treatment.specialist?.specialization || "General"} •{" "}
                      {treatment.specialist?.level || "Available"}
                    </Typography>
                  </Box>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button variant="outlined" size="small" sx={{ flex: 1 }}>
                    View Timeline
                  </Button>
                  <Button variant="contained" size="small" sx={{ flex: 1 }}>
                    Update
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {treatments.length === 0 && !loading && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Schedule sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No treatment plans found
          </Typography>
        </Box>
      )}

      {/* Add Treatment Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        disableRestoreFocus
      >
        <DialogTitle>Create New Treatment Plan</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <Controller
              name="patientName"
              control={control}
              rules={{ required: "Patient name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="patientName"
                  fullWidth
                  label="Patient Name"
                  margin="normal"
                  error={!!errors.patientName}
                  helperText={errors.patientName?.message}
                />
              )}
            />

            <Controller
              name="age"
              control={control}
              rules={{ required: "Age is required", min: 1, max: 120 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="age"
                  fullWidth
                  type="number"
                  label="Age"
                  margin="normal"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  error={!!errors.age}
                  helperText={errors.age?.message}
                />
              )}
            />

            <Controller
              name="ailmentDetails"
              control={control}
              rules={{ required: "Ailment details are required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="ailmentDetails"
                  fullWidth
                  multiline
                  rows={3}
                  label="Ailment Details"
                  margin="normal"
                  error={!!errors.ailmentDetails}
                  helperText={errors.ailmentDetails?.message}
                />
              )}
            />

            <Controller
              name="treatmentPackageId"
              control={control}
              rules={{ required: "Treatment package is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="treatmentPackageId"
                  select
                  fullWidth
                  label="Treatment Package"
                  margin="normal"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  error={!!errors.treatmentPackageId}
                  helperText={errors.treatmentPackageId?.message}
                >
                  {packages.map((pkg) => (
                    <MenuItem key={pkg.id} value={pkg.id}>
                      {pkg.name} - {pkg.specialization}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="treatmentCommencementDate"
              control={control}
              rules={{ required: "Commencement date is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="treatmentCommencementDate"
                  fullWidth
                  type="date"
                  label="Treatment Start Date"
                  margin="normal"
                  slotProps={{ inputLabel: { shrink: true } }}
                  error={!!errors.treatmentCommencementDate}
                  helperText={errors.treatmentCommencementDate?.message}
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit as any)}
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={20} /> : null}
          >
            {submitting ? "Creating..." : "Create Treatment"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Treatments;
