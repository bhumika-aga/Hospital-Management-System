package com.hospital.swagger.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api")
@Tag(name = "API Documentation", description = "Service endpoints for API documentation aggregation")
public class ApiDocumentationController {

    @Value("${services.auth.url:http://localhost:8080}")
    private String authServiceUrl;

    @Value("${services.treatment.url:http://localhost:8081}")
    private String treatmentServiceUrl;

    @Value("${services.timetable.url:http://localhost:8082}")
    private String timetableServiceUrl;

    @Value("${services.insurance.url:http://localhost:8083}")
    private String insuranceServiceUrl;

    @Operation(summary = "Get all service endpoints", description = "Returns a list of all microservice endpoints with their documentation URLs")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved service endpoints"),
            @ApiResponse(responseCode = "500", description = "Internal server error") })
    @GetMapping("/services")
    public ResponseEntity<Map<String, Map<String, String>>> getAllServices() {
        Map<String, Map<String, String>> services = new HashMap<>();

        // Authorization Service
        Map<String, String> authService = new HashMap<>();
        authService.put("name", "Authorization Service");
        authService.put("url", authServiceUrl);
        authService.put("docs", authServiceUrl + "/v3/api-docs");
        authService.put("swagger-ui", authServiceUrl + "/swagger-ui.html");
        authService.put("description", "JWT token management and authentication");
        services.put("authorization", authService);

        // Treatment Package Service
        Map<String, String> treatmentService = new HashMap<>();
        treatmentService.put("name", "IPTreatment Offering Service");
        treatmentService.put("url", treatmentServiceUrl);
        treatmentService.put("docs", treatmentServiceUrl + "/v3/api-docs");
        treatmentService.put("swagger-ui", treatmentServiceUrl + "/swagger-ui.html");
        treatmentService.put("description", "Treatment packages and specialists management");
        services.put("treatment-offering", treatmentService);

        // Treatment Timetable Service
        Map<String, String> timetableService = new HashMap<>();
        timetableService.put("name", "IPTreatment Service");
        timetableService.put("url", timetableServiceUrl);
        timetableService.put("docs", timetableServiceUrl + "/v3/api-docs");
        timetableService.put("swagger-ui", timetableServiceUrl + "/swagger-ui.html");
        timetableService.put("description", "Treatment timetable generation and management");
        services.put("treatment-timetable", timetableService);

        // Insurance Service
        Map<String, String> insuranceService = new HashMap<>();
        insuranceService.put("name", "Insurance Claim Service");
        insuranceService.put("url", insuranceServiceUrl);
        insuranceService.put("docs", insuranceServiceUrl + "/v3/api-docs");
        insuranceService.put("swagger-ui", insuranceServiceUrl + "/swagger-ui.html");
        insuranceService.put("description", "Insurance claim processing and management");
        services.put("insurance", insuranceService);

        return ResponseEntity.ok(services);
    }

    @Operation(summary = "Get service information", description = "Returns basic information about the HealthSync system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved service information") })
    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> getServiceInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("name", "HealthSync - International Patient Treatment Management System");
        info.put("version", "1.0.0");
        info.put("description", "Comprehensive microservices-based hospital management system");

        Map<String, String> features = new HashMap<>();
        features.put("authentication", "JWT-based authentication system");
        features.put("treatment-packages", "Comprehensive treatment package management");
        features.put("specialists", "Specialist assignment and management");
        features.put("timetables", "Automated treatment timetable generation");
        features.put("insurance", "Insurance claim processing");
        info.put("features", features);

        return ResponseEntity.ok(info);
    }
}