import {
  AccessTime,
  Add,
  CalendarToday,
  CheckCircle,
  ContactPhone,
  Edit,
  LocalHospital,
  Person,
  Refresh,
  Schedule,
  Timeline,
  Update,
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
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
  const [timelineDialogOpen, setTimelineDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentPlan | null>(null);
  const hasProcessedInitialSelection = useRef(false);

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

  // Handle selected package/specialist after data is loaded - only once
  useEffect(() => {
    if (packages.length === 0 || hasProcessedInitialSelection.current) return;

    // Check if a package was selected from the packages page
    const selectedPackageData = sessionStorage.getItem('selectedPackage');
    if (selectedPackageData) {
      try {
        const pkg = JSON.parse(selectedPackageData);
        reset({
          patientName: "",
          age: 0,
          ailmentDetails: "",
          treatmentPackageId: pkg.id,
          treatmentCommencementDate: "",
        });
        setDialogOpen(true);
        // Clear the stored package
        sessionStorage.removeItem('selectedPackage');
        hasProcessedInitialSelection.current = true;
      } catch (error) {
        console.error('Error parsing selected package:', error);
      }
      return; // Exit early if package was processed
    }

    // Check if a specialist was selected from the specialists page
    const selectedSpecialistData = sessionStorage.getItem('selectedSpecialist');
    if (selectedSpecialistData) {
      try {
        const specialist = JSON.parse(selectedSpecialistData);
        // Filter packages by specialist's specialization if available
        const specialistPackages = packages.filter(pkg => 
          pkg.specialization.toLowerCase() === specialist.specialization.toLowerCase()
        );
        
        if (specialistPackages.length > 0) {
          reset({
            patientName: "",
            age: 0,
            ailmentDetails: "",
            treatmentPackageId: specialistPackages[0].id, // Pre-select first matching package
            treatmentCommencementDate: "",
          });
        }
        setDialogOpen(true);
        // Clear the stored specialist
        sessionStorage.removeItem('selectedSpecialist');
        hasProcessedInitialSelection.current = true;
      } catch (error) {
        console.error('Error parsing selected specialist:', error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packages]);

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

  const handleViewTimeline = (treatment: TreatmentPlan) => {
    setSelectedTreatment(treatment);
    setTimelineDialogOpen(true);
  };

  const handleUpdateTreatment = (treatment: TreatmentPlan) => {
    setSelectedTreatment(treatment);
    setUpdateDialogOpen(true);
  };

  const handleCloseTimelineDialog = () => {
    setTimelineDialogOpen(false);
    setSelectedTreatment(null);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
    setSelectedTreatment(null);
  };

  const handleContactSpecialist = (treatment: TreatmentPlan) => {
    if (treatment.specialist?.email) {
      const subject = encodeURIComponent(`Treatment Update Request - ${treatment.patientName || treatment.name}`);
      const body = encodeURIComponent(
        `Dear Dr. ${treatment.specialist.name},\n\nI would like to discuss updates to the treatment plan for ${treatment.patientName || treatment.name}.\n\nTreatment ID: ${treatment.id}\nPackage: ${treatment.treatmentPackage?.name || treatment.treatmentPackageName}\n\nPlease let me know your availability for consultation.\n\nBest regards`
      );
      window.location.href = `mailto:${treatment.specialist.email}?subject=${subject}&body=${body}`;
    } else {
      // Fallback to a generic contact message
      alert(`Please contact Dr. ${treatment.specialist?.name || "your assigned specialist"} directly for treatment updates.`);
    }
  };

  const handleRequestChanges = (treatment: TreatmentPlan) => {
    // This could open another dialog for change requests in the future
    alert(`Change request functionality for ${treatment.patientName || treatment.name}'s treatment will be available soon. Please contact the specialist directly for now.`);
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
                  <Button 
                    variant="outlined" 
                    size="small" 
                    startIcon={<Timeline />}
                    onClick={() => handleViewTimeline(treatment)}
                    sx={{ flex: 1 }}
                  >
                    View Timeline
                  </Button>
                  <Button 
                    variant="contained" 
                    size="small" 
                    startIcon={<Edit />}
                    onClick={() => handleUpdateTreatment(treatment)}
                    sx={{ flex: 1 }}
                  >
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

      {/* Timeline Dialog */}
      <Dialog
        open={timelineDialogOpen}
        onClose={handleCloseTimelineDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedTreatment && (
          <>
            <DialogTitle>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Timeline sx={{ mr: 2, color: "primary.main" }} />
                <Box>
                  <Typography variant="h5">Treatment Timeline</Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {selectedTreatment.patientName || selectedTreatment.name}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>

            <DialogContent>
              <Stepper orientation="vertical">
                <Step active>
                  <StepLabel icon={<CheckCircle color="success" />}>
                    Treatment Started
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="text.secondary">
                      Started: {new Date(
                        selectedTreatment.treatmentCommencementDate ||
                        selectedTreatment.treatmentStartDate ||
                        new Date()
                      ).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      Package: {selectedTreatment.treatmentPackage?.name || selectedTreatment.treatmentPackageName}
                    </Typography>
                  </StepContent>
                </Step>

                <Step active>
                  <StepLabel icon={<Person color="primary" />}>
                    Specialist Assigned
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2">
                      Dr. {selectedTreatment.specialist?.name || "Not Assigned"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedTreatment.specialist?.specialization || "General"} • {selectedTreatment.specialist?.level || "Available"}
                    </Typography>
                  </StepContent>
                </Step>

                <Step active={getStatusColor(selectedTreatment.treatmentEndDate || new Date().toISOString()) === "success"}>
                  <StepLabel icon={<Schedule color={getStatusColor(selectedTreatment.treatmentEndDate || new Date().toISOString()) === "success" ? "primary" : "disabled"} />}>
                    Treatment In Progress
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="text.secondary">
                      Duration: {selectedTreatment.treatmentPackage?.durationWeeks || 4} weeks
                    </Typography>
                    <Typography variant="body2">
                      Ailment: {selectedTreatment.ailmentDetails || selectedTreatment.ailment}
                    </Typography>
                  </StepContent>
                </Step>

                <Step completed={getStatusColor(selectedTreatment.treatmentEndDate || new Date().toISOString()) === "default"}>
                  <StepLabel icon={<CheckCircle color={getStatusColor(selectedTreatment.treatmentEndDate || new Date().toISOString()) === "default" ? "success" : "disabled"} />}>
                    Treatment Completed
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="text.secondary">
                      Expected End: {new Date(
                        selectedTreatment.treatmentEndDate || new Date()
                      ).toLocaleDateString()}
                    </Typography>
                  </StepContent>
                </Step>
              </Stepper>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleCloseTimelineDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Update Dialog */}
      <Dialog
        open={updateDialogOpen}
        onClose={handleCloseUpdateDialog}
        maxWidth="sm"
        fullWidth
      >
        {selectedTreatment && (
          <>
            <DialogTitle>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Edit sx={{ mr: 2, color: "primary.main" }} />
                <Box>
                  <Typography variant="h5">Update Treatment</Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {selectedTreatment.patientName || selectedTreatment.name}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>

            <DialogContent>
              <Box sx={{ mt: 1 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Current Treatment Status
                </Typography>
                
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {/* Treatment Overview Card */}
                  <Paper sx={{ p: 2, bgcolor: "primary.50", border: 1, borderColor: "primary.200" }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <LocalHospital sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {selectedTreatment.treatmentPackage?.name || selectedTreatment.treatmentPackageName}
                      </Typography>
                      <Chip 
                        label={getStatusColor(selectedTreatment.treatmentEndDate || new Date().toISOString()) === "success" ? "Active" : "Completed"}
                        color={getStatusColor(selectedTreatment.treatmentEndDate || new Date().toISOString()) === "success" ? "success" : "default"}
                        size="small" 
                        sx={{ ml: "auto" }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Treatment ID: {selectedTreatment.id} • Duration: {selectedTreatment.treatmentPackage?.durationWeeks || 4} weeks
                    </Typography>
                  </Paper>

                  {/* Specialist Information Card */}
                  <Paper sx={{ p: 2, bgcolor: "background.paper", border: 1, borderColor: "divider" }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Person sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Assigned Specialist
                      </Typography>
                    </Box>
                    <Typography variant="body1">
                      Dr. {selectedTreatment.specialist?.name || "Not Assigned"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedTreatment.specialist?.specialization || "General"} • {selectedTreatment.specialist?.level || "Available"}
                    </Typography>
                    {selectedTreatment.specialist?.contactNumber && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Contact: {selectedTreatment.specialist.contactNumber}
                      </Typography>
                    )}
                  </Paper>

                  {/* Timeline Information */}
                  <Paper sx={{ p: 2, bgcolor: "background.paper", border: 1, borderColor: "divider" }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Schedule sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Treatment Schedule
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Start Date</Typography>
                        <Typography variant="body2">
                          {new Date(
                            selectedTreatment.treatmentCommencementDate ||
                            selectedTreatment.treatmentStartDate ||
                            new Date()
                          ).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">End Date</Typography>
                        <Typography variant="body2">
                          {new Date(selectedTreatment.treatmentEndDate || new Date()).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 3, p: 2, bgcolor: "warning.50", borderRadius: 1, border: 1, borderColor: "warning.200" }}>
                  <strong>💡 Need Changes?</strong> Use the buttons below to contact your specialist or request treatment modifications. All changes require specialist approval for safety and effectiveness.
                </Typography>
              </Box>
            </DialogContent>

            <DialogActions sx={{ p: 3, gap: 1 }}>
              <Button 
                onClick={handleCloseUpdateDialog}
                color="inherit"
              >
                Close
              </Button>
              <Box sx={{ flex: 1 }} />
              <Button 
                variant="outlined" 
                startIcon={<ContactPhone />}
                onClick={() => handleContactSpecialist(selectedTreatment)}
                sx={{ minWidth: 140 }}
              >
                Contact Specialist
              </Button>
              <Button 
                variant="contained" 
                startIcon={<Update />}
                onClick={() => handleRequestChanges(selectedTreatment)}
                sx={{ minWidth: 140 }}
              >
                Request Changes
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Treatments;
