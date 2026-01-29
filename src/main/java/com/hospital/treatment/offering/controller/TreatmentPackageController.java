package com.hospital.treatment.offering.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.treatment.offering.dto.TreatmentPackageDTO;
import com.hospital.treatment.offering.service.TreatmentPackageService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@CrossOrigin(origins = "*")
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Treatment Packages", description = "International Patient Treatment Packages Management")
public class TreatmentPackageController {

        @Autowired
        private TreatmentPackageService packageService;

        @GetMapping("/IPTreatmentPackages")
        @Operation(summary = "Get All Treatment Packages", description = "Retrieve list of all international patient treatment packages")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Successfully retrieved treatment packages"),
                        @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required") })
        public ResponseEntity<List<TreatmentPackageDTO>> getAllPackages() {
                List<TreatmentPackageDTO> packages = packageService.getAllPackages();
                return ResponseEntity.ok(packages);
        }

        @GetMapping("/IPTreatmentPackageByName")
        @Operation(summary = "Get Treatment Package by Name", description = "Retrieve a specific treatment package by its name")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Successfully retrieved treatment package"),
                        @ApiResponse(responseCode = "404", description = "Treatment package not found"),
                        @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required") })
        public ResponseEntity<TreatmentPackageDTO> getPackageByName(
                        @Parameter(description = "Name of the treatment package", required = true) @RequestParam String packageName) {
                TreatmentPackageDTO packageDTO = packageService.getPackageByName(packageName);
                return ResponseEntity.ok(packageDTO);
        }

        @GetMapping("/IPTreatmentPackages/specialization/{specialization}")
        @Operation(summary = "Get Packages by Specialization", description = "Retrieve treatment packages for a specific medical specialization")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Successfully retrieved packages for specialization"),
                        @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required") })
        public ResponseEntity<List<TreatmentPackageDTO>> getPackagesBySpecialization(
                        @Parameter(description = "Medical specialization (e.g., Orthopaedics, Urology)", required = true) @PathVariable String specialization) {
                List<TreatmentPackageDTO> packages = packageService.getPackagesBySpecialization(specialization);
                return ResponseEntity.ok(packages);
        }

        @PutMapping("/updatePackage/{packageId}")
        @Operation(summary = "Update Treatment Package", description = "Update details of an existing treatment package")
        @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Package updated successfully"),
                        @ApiResponse(responseCode = "404", description = "Package not found"),
                        @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required") })
        public ResponseEntity<TreatmentPackageDTO> updatePackage(
                        @Parameter(description = "ID of the package to update", required = true) @PathVariable Long packageId,
                        @Parameter(description = "Updated package details", required = true) @RequestBody TreatmentPackageDTO packageDTO) {
                TreatmentPackageDTO updatedPackage = packageService.updatePackage(packageId, packageDTO);
                return ResponseEntity.ok(updatedPackage);
        }
}