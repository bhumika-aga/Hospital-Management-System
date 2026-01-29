package com.hospital.treatment.offering.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.treatment.offering.dto.SpecialistDTO;
import com.hospital.treatment.offering.service.SpecialistService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@CrossOrigin(origins = "*")
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Specialists", description = "Medical Specialists Management")
public class SpecialistController {

        @Autowired
        private SpecialistService specialistService;

        @GetMapping("/specialists")
        @Operation(summary = "Get All Specialists", description = "Retrieve list of all medical specialists")
        @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Successfully retrieved specialists"),
                        @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required") })
        public ResponseEntity<List<SpecialistDTO>> getAllSpecialists() {
                List<SpecialistDTO> specialists = specialistService.getAllSpecialists();
                return ResponseEntity.ok(specialists);
        }

        @GetMapping("/specialistsByExpertise")
        @Operation(summary = "Get Specialists by Expertise", description = "Retrieve specialists filtered by their area of expertise")
        @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Successfully retrieved specialists"),
                        @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required") })
        public ResponseEntity<List<SpecialistDTO>> getSpecialistsByExpertise(
                        @Parameter(description = "Area of expertise/specialization", required = true) @RequestParam String areaOfExpertise) {
                List<SpecialistDTO> specialists = specialistService.getSpecialistsByExpertise(areaOfExpertise);
                return ResponseEntity.ok(specialists);
        }

        @GetMapping("/specialists/level/{level}")
        @Operation(summary = "Get Specialists by Level", description = "Retrieve specialists by their experience level (JUNIOR/SENIOR)")
        @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Successfully retrieved specialists"),
                        @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required") })
        public ResponseEntity<List<SpecialistDTO>> getSpecialistsByLevel(
                        @Parameter(description = "Experience level (JUNIOR or SENIOR)", required = true) @PathVariable String level) {
                List<SpecialistDTO> specialists = specialistService.getSpecialistsByLevel(level);
                return ResponseEntity.ok(specialists);
        }

        @GetMapping("/specialists/available")
        @Operation(summary = "Get Available Specialists", description = "Retrieve available specialists by specialization and level")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Successfully retrieved available specialists"),
                        @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required") })
        public ResponseEntity<List<SpecialistDTO>> getAvailableSpecialists(
                        @Parameter(description = "Medical specialization", required = true) @RequestParam String specialization,
                        @Parameter(description = "Experience level (JUNIOR or SENIOR)", required = true) @RequestParam String level) {
                List<SpecialistDTO> specialists = specialistService.getAvailableSpecialists(specialization, level);
                return ResponseEntity.ok(specialists);
        }

        @PostMapping("/addSpecialist")
        @Operation(summary = "Add New Specialist", description = "Add a new medical specialist to the system")
        @ApiResponses(value = { @ApiResponse(responseCode = "201", description = "Specialist added successfully"),
                        @ApiResponse(responseCode = "400", description = "Invalid specialist data"),
                        @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required") })
        public ResponseEntity<SpecialistDTO> addSpecialist(
                        @Parameter(description = "Specialist details", required = true) @RequestBody SpecialistDTO specialistDTO) {
                SpecialistDTO savedSpecialist = specialistService.addSpecialist(specialistDTO);
                return new ResponseEntity<>(savedSpecialist, HttpStatus.CREATED);
        }

        @DeleteMapping("/deleteSpecialist/{specialistId}")
        @Operation(summary = "Delete Specialist", description = "Remove a specialist from the system")
        @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Specialist deleted successfully"),
                        @ApiResponse(responseCode = "404", description = "Specialist not found"),
                        @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required") })
        public ResponseEntity<Map<String, String>> deleteSpecialist(
                        @Parameter(description = "ID of the specialist to delete", required = true) @PathVariable Long specialistId) {
                specialistService.deleteSpecialist(specialistId);
                return ResponseEntity.ok(Map.of("message", "Specialist deleted successfully", "status", "success"));
        }

        @PutMapping("/updateSpecialist/{specialistId}")
        @Operation(summary = "Update Specialist", description = "Update details of an existing specialist")
        @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Specialist updated successfully"),
                        @ApiResponse(responseCode = "404", description = "Specialist not found"),
                        @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token required") })
        public ResponseEntity<SpecialistDTO> updateSpecialist(
                        @Parameter(description = "ID of the specialist to update", required = true) @PathVariable Long specialistId,
                        @Parameter(description = "Updated specialist details", required = true) @RequestBody SpecialistDTO specialistDTO) {
                SpecialistDTO updatedSpecialist = specialistService.updateSpecialist(specialistId, specialistDTO);
                return ResponseEntity.ok(updatedSpecialist);
        }
}