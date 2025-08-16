import {
  AccessTime,
  Add,
  AttachMoney,
  Cancel,
  CheckCircle,
  Receipt,
  Refresh,
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { InsuranceService } from "../services/insurance.service";
import { TreatmentService } from "../services/treatment.service";
import { ClaimRequest, Insurer, TreatmentPackage } from "../types";

const Claims: React.FC = () => {
  const [claims, setClaims] = useState<ClaimRequest[]>([]);
  const [insurers, setInsurers] = useState<Insurer[]>([]);
  const [treatmentPackages, setTreatmentPackages] = useState<
    TreatmentPackage[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<ClaimRequest | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      patientName: "",
      ailment: "",
      treatmentPackageId: "",
      insurerId: "",
      treatmentCost: 0,
    },
  });

  // Watch the treatment package selection to auto-populate cost
  const selectedPackageId = useWatch({ control, name: "treatmentPackageId" });

  useEffect(() => {
    if (selectedPackageId && treatmentPackages.length > 0) {
      console.log(
        "Selected package ID:",
        selectedPackageId,
        "Type:",
        typeof selectedPackageId
      );
      console.log(
        "Available packages:",
        treatmentPackages.map((pkg) => ({
          id: pkg.id,
          name: pkg.name,
          cost: pkg.cost,
        }))
      );

      const selectedPackage = treatmentPackages.find(
        (pkg) =>
          pkg.id === Number(selectedPackageId) ||
          pkg.id.toString() === selectedPackageId.toString()
      );

      console.log("Found package:", selectedPackage);

      if (selectedPackage) {
        console.log("Setting cost to:", selectedPackage.cost);
        setValue("treatmentCost", selectedPackage.cost);
      }
    }
  }, [selectedPackageId, treatmentPackages, setValue]);

  // Handler for when treatment package is selected
  const handlePackageChange = useCallback(
    (packageId: string) => {
      if (packageId && treatmentPackages.length > 0) {
        const selectedPackage = treatmentPackages.find(
          (pkg) =>
            pkg.id.toString() === packageId || pkg.id === Number(packageId)
        );
        if (selectedPackage) {
          setValue("treatmentCost", selectedPackage.cost);
        }
      }
    },
    [treatmentPackages, setValue]
  );

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [claimsData, insurersData, packagesData] = await Promise.all([
        InsuranceService.getAllClaims(),
        InsuranceService.getAllInsurers(),
        TreatmentService.getTreatmentPackages(),
      ]);
      setClaims(claimsData);
      setInsurers(insurersData);
      setTreatmentPackages(packagesData);
    } catch (err: any) {
      setError("Failed to load claims data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      console.log("Form data submitted:", data);
      console.log(
        "Available insurers:",
        insurers.map((ins) => ({ id: ins.id, name: ins.insurerName }))
      );
      console.log(
        "Looking for insurer ID:",
        data.insurerId,
        "Type:",
        typeof data.insurerId
      );

      // Find the selected insurer to get the insurer name
      const selectedInsurer = insurers.find(
        (insurer) =>
          insurer.id === Number(data.insurerId) ||
          insurer.id.toString() === data.insurerId.toString()
      );

      console.log("Found insurer:", selectedInsurer);

      if (!selectedInsurer) {
        throw new Error(
          `Selected insurer not found. Insurer ID: ${
            data.insurerId
          }, Available IDs: ${insurers.map((i) => i.id).join(", ")}`
        );
      }

      // Find the selected treatment package to get the package name
      const selectedPackage = treatmentPackages.find(
        (pkg) =>
          pkg.id === Number(data.treatmentPackageId) ||
          pkg.id.toString() === data.treatmentPackageId.toString()
      );
      if (!selectedPackage) {
        throw new Error(
          `Selected treatment package not found. Package ID: ${data.treatmentPackageId}`
        );
      }

      const claimRequest = {
        patientName: data.patientName,
        ailment: data.ailment,
        treatmentPackageName: selectedPackage.name,
        insurerName: selectedInsurer.insurerName,
        treatmentCost: Number(data.treatmentCost),
      };

      console.log("Initiating claim with data:", claimRequest);
      const newClaim = await InsuranceService.initiateClaim(claimRequest);
      console.log("API response - new claim:", newClaim);

      // Ensure the new claim has all required properties
      const claimWithDefaults: ClaimRequest = {
        ...newClaim,
        id: newClaim.id || Date.now() + Math.floor(Math.random() * 1000), // Fallback unique number ID if not provided
        treatmentCost: newClaim.treatmentCost || claimRequest.treatmentCost,
        claimAmount: newClaim.claimAmount || 0,
        claimStatus: newClaim.claimStatus || "INITIATED",
        dateOfClaim: newClaim.dateOfClaim || new Date().toISOString(),
        patientName: newClaim.patientName || claimRequest.patientName,
        insurerId: newClaim.insurerId || 0,
      };

      console.log("Claim with defaults:", claimWithDefaults);
      setClaims([...claims, claimWithDefaults]);
      setDialogOpen(false);
      reset();
    } catch (err: any) {
      console.error("Failed to initiate claim:", err);
      setError(`Failed to initiate claim: ${err.message || err.toString()}`);
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircle sx={{ color: "success.main" }} />;
      case "REJECTED":
        return <Cancel sx={{ color: "error.main" }} />;
      default:
        return <AccessTime sx={{ color: "warning.main" }} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "success";
      case "REJECTED":
        return "error";
      default:
        return "warning";
    }
  };

  const handleViewClaim = (claim: ClaimRequest) => {
    setSelectedClaim(claim);
    setViewDialogOpen(true);
  };

  const downloadReceipt = (claim: ClaimRequest | null) => {
    if (!claim) return;

    // Create HTML receipt
    const receiptHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Insurance Claim Receipt</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
        .hospital-name { font-size: 24px; font-weight: bold; color: #000; }
        .receipt-title { font-size: 20px; margin: 20px 0; }
        .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
        .detail-item { margin: 10px 0; }
        .label { font-weight: bold; color: #666; }
        .value { margin-left: 10px; }
        .status { padding: 5px 15px; border-radius: 20px; font-weight: bold; }
        .status.APPROVED { background-color: #d4edda; color: #155724; }
        .status.REJECTED { background-color: #f8d7da; color: #721c24; }
        .status.INITIATED { background-color: #fff3cd; color: #856404; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <div class="hospital-name">HealthSync - Hospital Management System</div>
        <div>123 Medical Street, Healthcare City, HC 110001</div>
        <div>Phone: +91 12345 67890 | Email: support@healthsync.com</div>
    </div>
    
    <div class="receipt-title">Insurance Claim Receipt</div>
    
    <div class="details-grid">
        <div>
            <div class="detail-item">
                <span class="label">Claim ID:</span>
                <span class="value">#${claim.id}</span>
            </div>
            <div class="detail-item">
                <span class="label">Patient Name:</span>
                <span class="value">${claim.patientName}</span>
            </div>
            <div class="detail-item">
                <span class="label">Insurance Provider:</span>
                <span class="value">${
                  claim.insurer?.insurerName || "N/A"
                }</span>
            </div>
        </div>
        <div>
            <div class="detail-item">
                <span class="label">Treatment Cost:</span>
                <span class="value">₹${
                  claim.treatmentCost?.toLocaleString() || "0"
                }</span>
            </div>
            <div class="detail-item">
                <span class="label">Claim Amount:</span>
                <span class="value">₹${
                  claim.claimAmount?.toLocaleString() || "0"
                }</span>
            </div>
            <div class="detail-item">
                <span class="label">Date of Claim:</span>
                <span class="value">${new Date(
                  claim.dateOfClaim
                ).toLocaleDateString("en-IN")}</span>
            </div>
        </div>
    </div>
    
    <div class="detail-item">
        <span class="label">Status:</span>
        <span class="status ${claim.claimStatus}">${claim.claimStatus}</span>
    </div>
    
    <div class="footer">
        <p>This is a computer-generated receipt. No signature is required.</p>
        <p>Generated on: ${new Date().toLocaleDateString(
          "en-IN"
        )} at ${new Date().toLocaleTimeString("en-IN")}</p>
    </div>
</body>
</html>`;

    // Create and download the receipt
    const blob = new Blob([receiptHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `claim-receipt-${claim.id}-${
      new Date().toISOString().split("T")[0]
    }.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  try {
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
            Insurance Claims
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Manage insurance claims and reimbursements
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setDialogOpen(true)}
            >
              New Claim
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

        {/* Statistics Cards */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 4 }}>
          <Box
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 calc(50% - 12px)",
                md: "1 1 calc(25% - 18px)",
              },
            }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                    <Receipt />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {claims.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Claims
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 calc(50% - 12px)",
                md: "1 1 calc(25% - 18px)",
              },
            }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: "success.main", mr: 2 }}>
                    <CheckCircle />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {
                        claims.filter((c) => c.claimStatus === "APPROVED")
                          .length
                      }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Approved
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 calc(50% - 12px)",
                md: "1 1 calc(25% - 18px)",
              },
            }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: "warning.main", mr: 2 }}>
                    <AccessTime />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {
                        claims.filter((c) => c.claimStatus === "INITIATED")
                          .length
                      }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pending
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 calc(50% - 12px)",
                md: "1 1 calc(25% - 18px)",
              },
            }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: "info.main", mr: 2 }}>
                    <AttachMoney />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      ₹
                      {claims
                        .reduce((sum, c) => sum + (c.claimAmount || 0), 0)
                        .toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Amount
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Claims Table */}
        <Paper sx={{ borderRadius: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Insurer</TableCell>
                  <TableCell align="right">Treatment Cost</TableCell>
                  <TableCell align="right">Claim Amount</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {claims.map((claim, index) => (
                  <TableRow
                    key={claim.id || `claim_${index}_${claim.patientName}`}
                    hover
                  >
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            mr: 2,
                            bgcolor: "primary.main",
                            fontSize: "0.8rem",
                          }}
                        >
                          {claim.patientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {claim.patientName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {claim.insurer?.insurerName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {claim.insurerId}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        ₹{claim.treatmentCost?.toLocaleString() || "0"}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: "primary.main" }}
                      >
                        ₹{claim.claimAmount?.toLocaleString() || "0"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={claim.claimStatus}
                        color={getStatusColor(claim.claimStatus) as any}
                        size="small"
                        icon={getStatusIcon(claim.claimStatus)}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(claim.dateOfClaim).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleViewClaim(claim)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {claims.length === 0 && !loading && (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Receipt sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No claims found
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Add Claim Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Initiate New Insurance Claim</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ mt: 1 }}>
              <Controller
                name="patientName"
                control={control}
                rules={{ required: "Patient name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Patient Name"
                    margin="normal"
                    error={!!errors.patientName}
                    helperText={errors.patientName?.message}
                  />
                )}
              />

              <Controller
                name="ailment"
                control={control}
                rules={{ required: "Ailment is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Ailment"
                    margin="normal"
                    error={!!errors.ailment}
                    helperText={errors.ailment?.message}
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
                    select
                    fullWidth
                    label="Treatment Package"
                    margin="normal"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e);
                      handlePackageChange(e.target.value);
                    }}
                    error={!!errors.treatmentPackageId}
                    helperText={errors.treatmentPackageId?.message}
                  >
                    {treatmentPackages.map((pkg) => (
                      <MenuItem key={pkg.id} value={pkg.id}>
                        {pkg.name} - {pkg.specialization} (₹
                        {pkg.cost.toLocaleString()})
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              <Controller
                name="treatmentCost"
                control={control}
                rules={{ required: "Treatment cost is required", min: 1 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Treatment Cost (₹)"
                    margin="normal"
                    value={field.value || 0}
                    slotProps={{ input: { readOnly: true } }}
                    error={!!errors.treatmentCost}
                    helperText={
                      errors.treatmentCost?.message ||
                      "Auto-populated based on selected package"
                    }
                  />
                )}
              />

              <Controller
                name="insurerId"
                control={control}
                rules={{ required: "Insurer is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label="Insurance Provider"
                    margin="normal"
                    value={field.value || ""}
                    error={!!errors.insurerId}
                    helperText={errors.insurerId?.message}
                  >
                    {insurers.map((insurer) => (
                      <MenuItem key={insurer.id} value={insurer.id}>
                        {insurer.insurerName} (Max: ₹
                        {insurer.maxCashlessAmount?.toLocaleString() ?? "0"})
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              disabled={submitting}
              startIcon={submitting ? <CircularProgress size={20} /> : null}
            >
              {submitting ? "Initiating..." : "Initiate Claim"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* View Claim Details Dialog */}
        <Dialog
          open={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Receipt sx={{ color: "primary.main" }} />
              Claim Details
            </Box>
          </DialogTitle>
          <DialogContent>
            {selectedClaim && (
              <Box sx={{ mt: 1 }}>
                {/* Header Section */}
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: "primary.main",
                      fontSize: "1.2rem",
                    }}
                  >
                    {selectedClaim.patientName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {selectedClaim.patientName}
                    </Typography>
                    <Chip
                      label={selectedClaim.claimStatus}
                      color={getStatusColor(selectedClaim.claimStatus) as any}
                      size="small"
                      icon={getStatusIcon(selectedClaim.claimStatus)}
                      variant="outlined"
                    />
                  </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Claim Information Grid */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: 3,
                  }}
                >
                  <Card variant="outlined">
                    <CardContent>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Claim ID
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        #{selectedClaim.id}
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card variant="outlined">
                    <CardContent>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Treatment Cost
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: "primary.main" }}
                      >
                        ₹{selectedClaim.treatmentCost?.toLocaleString() || "0"}
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card variant="outlined">
                    <CardContent>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Claim Amount
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: "success.main" }}
                      >
                        ₹{selectedClaim.claimAmount?.toLocaleString() || "0"}
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card variant="outlined">
                    <CardContent>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Date of Claim
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {new Date(selectedClaim.dateOfClaim).toLocaleDateString(
                          "en-IN",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>

                {selectedClaim.insurer && (
                  <>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Insurance Provider Details
                    </Typography>
                    <Card variant="outlined">
                      <CardContent>
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: 2,
                          }}
                        >
                          <Box>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              Provider Name
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: 500 }}
                            >
                              {selectedClaim.insurer.insurerName}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              Contact Number
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: 500 }}
                            >
                              {selectedClaim.insurer.insurerContactNumber}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              Max Cashless Amount
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: 500 }}
                            >
                              ₹
                              {selectedClaim.insurer.maxCashlessAmount?.toLocaleString() ||
                                "0"}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              Address
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: 500 }}
                            >
                              {selectedClaim.insurer.insurerAddress}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </>
                )}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
            <Button
              variant="contained"
              startIcon={<Receipt />}
              onClick={() => downloadReceipt(selectedClaim)}
            >
              Download Receipt
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  } catch (error) {
    console.error("Error in Claims component:", error);
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 8,
        }}
      >
        <Typography variant="h6" color="error" gutterBottom>
          An error occurred in the Claims component
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please refresh the page or contact support if the issue persists.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </Button>
      </Box>
    );
  }
};

export default Claims;
