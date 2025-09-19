package com.hospital.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping("/")
    public Map<String, Object> root() {
        Map<String, Object> response = new HashMap<>();
        response.put("application", "MediFlow - Hospital Management System");
        response.put("version", "2.0.0");
        response.put("status", "running");
        response.put("timestamp", LocalDateTime.now());
        response.put("documentation", "/swagger-ui.html");
        response.put("healthCheck", "/actuator/health");
        response.put("apiDocs", "/v3/api-docs");

        Map<String, String> endpoints = new HashMap<>();
        endpoints.put("Authentication", "/auth/generate-token");
        endpoints.put("Treatment Packages", "/IPTreatmentPackages");
        endpoints.put("Specialists", "/specialists");
        endpoints.put("Insurance Claims", "/insurance/InitiateClaim");
        endpoints.put("Treatment Plans", "/IPTreatment/generateTimetable");

        response.put("availableEndpoints", endpoints);

        return response;
    }
}