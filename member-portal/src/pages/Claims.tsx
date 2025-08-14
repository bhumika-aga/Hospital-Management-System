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
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InsuranceService } from "../services/insurance.service";
import { ClaimRequest, Insurer } from "../types";

const Claims: React.FC = () => {
  const [claims, setClaims] = useState<ClaimRequest[]>([]);
  const [insurers, setInsurers] = useState<Insurer[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      patientName: '',
      ailment: '',
      treatmentPackageName: '',
      insurerId: '',
      treatmentCost: 0,
    },
  });

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [claimsData, insurersData] = await Promise.all([
        InsuranceService.getAllClaims(),
        InsuranceService.getAllInsurers(),
      ]);
      setClaims(claimsData);
      setInsurers(insurersData);
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
      // Find the selected insurer to get the insurer name
      const selectedInsurer = insurers.find(insurer => insurer.id.toString() === data.insurerId);
      if (!selectedInsurer) {
        throw new Error("Selected insurer not found");
      }
      
      const claimRequest = {
        patientName: data.patientName,
        ailment: data.ailment,
        treatmentPackageName: data.treatmentPackageName,
        insurerName: selectedInsurer.insurerName,
        treatmentCost: Number(data.treatmentCost),
      };
      const newClaim = await InsuranceService.initiateClaim(claimRequest);
      setClaims([...claims, newClaim]);
      setDialogOpen(false);
      reset();
    } catch (err: any) {
      setError("Failed to initiate claim");
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
                    {claims.filter((c) => c.claimStatus === "APPROVED").length}
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
                    {claims.filter((c) => c.claimStatus === "INITIATED").length}
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
                      .reduce((sum, c) => sum + c.claimAmount, 0)
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
              {claims.map((claim) => (
                <TableRow key={claim.id} hover>
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
                      ₹{claim.treatmentCost.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: "primary.main" }}
                    >
                      ₹{claim.claimAmount.toLocaleString()}
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
                    <Button size="small" variant="outlined">
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
              name="treatmentPackageName"
              control={control}
              rules={{ required: "Treatment package name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Treatment Package Name"
                  margin="normal"
                  error={!!errors.treatmentPackageName}
                  helperText={errors.treatmentPackageName?.message}
                />
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
                  error={!!errors.treatmentCost}
                  helperText={errors.treatmentCost?.message}
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
                  error={!!errors.insurerId}
                  helperText={errors.insurerId?.message}
                >
                  {insurers.map((insurer) => (
                    <MenuItem key={insurer.id} value={insurer.id}>
                      {insurer.insurerName} (Max: ₹
                      {insurer.maxCashlessAmount?.toLocaleString() ?? '0'})
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
    </Box>
  );
};

export default Claims;
