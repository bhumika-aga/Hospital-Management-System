package com.hospital.insurance.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.insurance.dto.ClaimInitiationRequest;
import com.hospital.insurance.dto.ClaimInitiationResponse;
import com.hospital.insurance.dto.InsurerDTO;
import com.hospital.insurance.entity.ClaimRequest;
import com.hospital.insurance.service.InsuranceClaimService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/insurance")
@CrossOrigin(origins = "*")
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Insurance Claims", description = "Insurance Claim Processing and Insurer Management")
public class InsuranceController {

    @Autowired
    private InsuranceClaimService claimService;

    @GetMapping("/GetAllInsurerDetail")
    @Operation(summary = "Get All Insurer Details", description = "Retrieve comprehensive list of all active insurance providers with their coverage details, limits, and contact information")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved all insurer details"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required") })
    public ResponseEntity<List<InsurerDTO>> getAllInsurerDetails() {
        List<InsurerDTO> insurers = claimService.getAllInsurerDetails();
        return ResponseEntity.ok(insurers);
    }

    @GetMapping("/GetInsurerByPackageName")
    @Operation(summary = "Get Insurer by Package Name", description = "Retrieve insurer details for a specific medical package/specialization")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Successfully retrieved insurer details"),
            @ApiResponse(responseCode = "404", description = "No insurer found for the specified package"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required") })
    public ResponseEntity<InsurerDTO> getInsurerByPackageName(
            @Parameter(description = "Treatment package name (e.g., Orthopaedics, Urology)", required = true) @RequestParam String packageName) {
        InsurerDTO insurer = claimService.getInsurerByPackageName(packageName);
        return ResponseEntity.ok(insurer);
    }

    @PostMapping("/InitiateClaim")
    @Operation(summary = "Initiate Insurance Claim", description = "Process insurance claim initiation for a patient's completed treatment. "
            + "Calculates insurance coverage, balance amount to be paid by patient, and generates claim reference number.")
    @ApiResponses(value = { @ApiResponse(responseCode = "201", description = "Insurance claim initiated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid claim request data"),
            @ApiResponse(responseCode = "404", description = "Insurer not found or inactive"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required") })
    public ResponseEntity<ClaimInitiationResponse> initiateClaim(
            @Parameter(description = "Claim initiation request with patient and treatment details", required = true) @RequestBody ClaimInitiationRequest claimRequest) {

        ClaimInitiationResponse response = claimService.initiateClaim(claimRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/claims")
    @Operation(summary = "Get All Claims", description = "Retrieve list of all insurance claim requests in the system")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Successfully retrieved all claims"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required") })
    public ResponseEntity<List<ClaimRequest>> getAllClaims() {
        List<ClaimRequest> claims = claimService.getClaimsByStatus("INITIATED");
        return ResponseEntity.ok(claims);
    }

    @GetMapping("/claims/status/{status}")
    @Operation(summary = "Get Claims by Status", description = "Retrieve insurance claims filtered by their processing status")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Successfully retrieved claims by status"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required") })
    public ResponseEntity<List<ClaimRequest>> getClaimsByStatus(
            @Parameter(description = "Claim status (INITIATED, PROCESSING, APPROVED, REJECTED, DISBURSED)", required = true) @PathVariable String status) {
        List<ClaimRequest> claims = claimService.getClaimsByStatus(status);
        return ResponseEntity.ok(claims);
    }

    @GetMapping("/claims/patient/{patientId}")
    @Operation(summary = "Get Claim by Patient ID", description = "Retrieve insurance claim details for a specific patient")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Successfully retrieved patient's claim"),
            @ApiResponse(responseCode = "404", description = "No claim found for the specified patient"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required") })
    public ResponseEntity<ClaimRequest> getClaimByPatientId(
            @Parameter(description = "Patient ID", required = true) @PathVariable Long patientId) {
        ClaimRequest claim = claimService.getClaimByPatientId(patientId);
        return ResponseEntity.ok(claim);
    }

    @GetMapping("/claims/reference/{referenceNumber}")
    @Operation(summary = "Get Claim by Reference Number", description = "Retrieve insurance claim details using claim reference number")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Successfully retrieved claim details"),
            @ApiResponse(responseCode = "404", description = "Claim not found with specified reference number"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required") })
    public ResponseEntity<ClaimRequest> getClaimByReferenceNumber(
            @Parameter(description = "Claim reference number", required = true) @PathVariable String referenceNumber) {
        ClaimRequest claim = claimService.getClaimByReferenceNumber(referenceNumber);
        return ResponseEntity.ok(claim);
    }

    @PutMapping("/claims/{claimId}/status")
    @Operation(summary = "Update Claim Status", description = "Update the processing status of an insurance claim")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Claim status updated successfully"),
            @ApiResponse(responseCode = "404", description = "Claim not found"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required") })
    public ResponseEntity<ClaimRequest> updateClaimStatus(
            @Parameter(description = "Claim ID", required = true) @PathVariable Long claimId,
            @Parameter(description = "New claim status", required = true) @RequestParam String status) {

        ClaimRequest updatedClaim = claimService.updateClaimStatus(claimId, status);
        return ResponseEntity.ok(updatedClaim);
    }

    @GetMapping("/insurance-info")
    @Operation(summary = "Get Insurance Information", description = "Retrieve general information about insurance coverage and claim processing")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved insurance information"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required") })
    public ResponseEntity<Map<String, Object>> getInsuranceInfo() {
        Map<String, Object> insuranceInfo = Map.of("supportedSpecializations", List.of("Orthopaedics", "Urology"),
                "claimProcessingSteps",
                List.of("1. Select appropriate insurer for treatment package",
                        "2. Submit claim with patient and treatment details",
                        "3. System calculates coverage and balance amount", "4. Claim reference number generated",
                        "5. Expected disbursement date provided", "6. Patient pays balance amount"),
                "claimStatuses", List.of("INITIATED", "PROCESSING", "APPROVED", "REJECTED", "DISBURSED"),
                "balanceCalculation", "Balance Amount = Treatment Cost - Insurance Coverage (up to limit)",
                "averageProcessingTime", "7-15 days depending on insurer", "totalActiveInsurers",
                claimService.getAllInsurerDetails().size());
        return ResponseEntity.ok(insuranceInfo);
    }
}