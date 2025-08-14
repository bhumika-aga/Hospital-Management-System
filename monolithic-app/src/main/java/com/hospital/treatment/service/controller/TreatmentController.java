package com.hospital.treatment.service.controller;

import com.hospital.treatment.service.dto.PatientDetailRequest;
import com.hospital.treatment.service.dto.TreatmentPlanResponse;
import com.hospital.treatment.service.entity.PatientDetail;
import com.hospital.treatment.service.service.TreatmentTimetableService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/IPTreatment")
@CrossOrigin(origins = "*")
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Treatment Management", description = "International Patient Treatment Timetable and Management")
public class TreatmentController {
    
    @Autowired
    private TreatmentTimetableService treatmentService;
    
    @PostMapping("/generateTimetable")
    @Operation(
        summary = "Formulate Treatment Timetable",
        description = "Generate a comprehensive treatment timetable for a patient based on their ailment and chosen package. " +
                          "Automatically assigns appropriate specialist (Package 1→Junior, Package 2→Senior) and creates treatment plan."
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Treatment timetable created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid patient details or package information"),
        @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required"),
        @ApiResponse(responseCode = "404", description = "Package not found or specialist unavailable")
    })
    public ResponseEntity<TreatmentPlanResponse> formulateTreatmentTimetable(
        @Parameter(description = "Patient details including name, age, ailment, package choice, and treatment start date", required = true)
        @RequestBody PatientDetailRequest patientDetail) {
        
        TreatmentPlanResponse treatmentPlan = treatmentService.formulateTreatmentTimetable(patientDetail);
        return new ResponseEntity<>(treatmentPlan, HttpStatus.CREATED);
    }
    
    @GetMapping("/treatments")
    @Operation(
        summary = "Get All Treatments",
        description = "Retrieve list of all treatment records for dashboard statistics"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved treatments list"),
        @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required")
    })
    public ResponseEntity<List<PatientDetail>> getAllTreatments() {
        List<PatientDetail> treatments = treatmentService.getAllPatients();
        return ResponseEntity.ok(treatments);
    }
    
    @GetMapping("/patients")
    @Operation(
        summary = "Get All Patients",
        description = "Retrieve list of all registered patients with their treatment status"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved patients list"),
        @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required")
    })
    public ResponseEntity<List<PatientDetail>> getAllPatients() {
        List<PatientDetail> patients = treatmentService.getPatientsByStatus("IN_PROGRESS");
        return ResponseEntity.ok(patients);
    }
    
    @GetMapping("/patients/status/{status}")
    @Operation(
        summary = "Get Patients by Status",
        description = "Retrieve patients filtered by treatment status (IN_PROGRESS, COMPLETED, CANCELLED)"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved patients by status"),
        @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required")
    })
    public ResponseEntity<List<PatientDetail>> getPatientsByStatus(
        @Parameter(description = "Treatment status (IN_PROGRESS, COMPLETED, CANCELLED)", required = true)
        @PathVariable String status) {
        List<PatientDetail> patients = treatmentService.getPatientsByStatus(status.toUpperCase());
        return ResponseEntity.ok(patients);
    }
    
    @GetMapping("/treatment-plan/{patientId}")
    @Operation(
        summary = "Get Treatment Plan by Patient ID",
        description = "Retrieve detailed treatment plan for a specific patient including specialist assignment and schedule"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved treatment plan"),
        @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required"),
        @ApiResponse(responseCode = "404", description = "Patient or treatment plan not found")
    })
    public ResponseEntity<TreatmentPlanResponse> getTreatmentPlan(
        @Parameter(description = "Patient ID", required = true)
        @PathVariable Long patientId) {
        TreatmentPlanResponse treatmentPlan = treatmentService.getTreatmentPlan(patientId);
        return ResponseEntity.ok(treatmentPlan);
    }
    
    @PutMapping("/patients/{patientId}/status")
    @Operation(
        summary = "Update Treatment Status",
        description = "Update the treatment status of a patient (e.g., mark as COMPLETED for insurance claim processing)"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Treatment status updated successfully"),
        @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required"),
        @ApiResponse(responseCode = "404", description = "Patient not found")
    })
    public ResponseEntity<Map<String, String>> updateTreatmentStatus(
        @Parameter(description = "Patient ID", required = true)
        @PathVariable Long patientId,
        @Parameter(description = "New treatment status", required = true)
        @RequestParam String status) {
        
        treatmentService.updateTreatmentStatus(patientId, status.toUpperCase());
        return ResponseEntity.ok(Map.of(
            "message", "Treatment status updated successfully",
            "patientId", patientId.toString(),
            "newStatus", status.toUpperCase(),
            "status", "success"
        ));
    }
    
    @GetMapping("/packages/info")
    @Operation(
        summary = "Get Package Information",
        description = "Retrieve information about available treatment packages for reference"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved package information"),
        @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required")
    })
    public ResponseEntity<Map<String, Object>> getPackageInfo() {
        Map<String, Object> packageInfo = Map.of(
            "availablePackages", List.of(
                Map.of(
                    "name", "Orthopaedics Package 1",
                    "specialization", "Orthopaedics",
                    "tests", List.of("OPT1", "OPT2"),
                    "cost", 2500,
                    "durationWeeks", 4,
                    "assignedSpecialistLevel", "JUNIOR"
                ),
                Map.of(
                    "name", "Orthopaedics Package 2",
                    "specialization", "Orthopaedics",
                    "tests", List.of("OPT3", "OPT4"),
                    "cost", 3000,
                    "durationWeeks", 6,
                    "assignedSpecialistLevel", "SENIOR"
                ),
                Map.of(
                    "name", "Urology Package 1",
                    "specialization", "Urology",
                    "tests", List.of("UPT1", "UPT2"),
                    "cost", 4000,
                    "durationWeeks", 4,
                    "assignedSpecialistLevel", "JUNIOR"
                ),
                Map.of(
                    "name", "Urology Package 2",
                    "specialization", "Urology",
                    "tests", List.of("UPT3", "UPT4"),
                    "cost", 5000,
                    "durationWeeks", 6,
                    "assignedSpecialistLevel", "SENIOR"
                )
            ),
            "assignmentRules", Map.of(
                "Package 1", "Assigned to JUNIOR specialist",
                "Package 2", "Assigned to SENIOR specialist"
            )
        );
        return ResponseEntity.ok(packageInfo);
    }
}