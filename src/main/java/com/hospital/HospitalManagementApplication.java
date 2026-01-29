package com.hospital;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Main Spring Boot Application for Hospital Management System Monolithic
 * application combining all hospital services: - Authorization and
 * Authentication - Insurance Claims Management - IP Treatment Offering - IP
 * Treatment Services - API Documentation
 */
@SpringBootApplication
@EnableTransactionManagement
public class HospitalManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(HospitalManagementApplication.class, args);

        // Get the actual server port from environment or default
        String port = System.getProperty("server.port", System.getenv("PORT"));
        if (port == null)
            port = "8080"; // Default port

        String baseUrl = "http://localhost:" + port;

        System.out.println("==============================================");
        System.out.println("Hospital Management System Started Successfully");
        System.out.println("==============================================");
        System.out.println("Available Services:");
        System.out.println("- Authorization: " + baseUrl + "/auth/");
        System.out.println("- Insurance Claims: " + baseUrl + "/insurance/");
        System.out.println("- Treatment Packages: " + baseUrl + "/IPTreatmentPackages/");
        System.out.println("- Treatment Services: " + baseUrl + "/IPTreatment/");
        System.out.println("- API Documentation: " + baseUrl + "/swagger-ui.html");
        System.out.println("- Health Check: " + baseUrl + "/actuator/health");
        System.out.println("==============================================");
    }
}