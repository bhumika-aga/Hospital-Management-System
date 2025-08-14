package com.hospital;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Main Spring Boot Application for Hospital Management System
 * Monolithic application combining all hospital services:
 * - Authorization and Authentication
 * - Insurance Claims Management
 * - IP Treatment Offering
 * - IP Treatment Services
 * - API Documentation
 */
@SpringBootApplication
@EnableTransactionManagement
public class HospitalManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(HospitalManagementApplication.class, args);
        System.out.println("==============================================");
        System.out.println("Hospital Management System Started Successfully");
        System.out.println("==============================================");
        System.out.println("Available Services:");
        System.out.println("- Authorization: http://localhost:8080/auth/");
        System.out.println("- Insurance Claims: http://localhost:8080/insurance/");
        System.out.println("- Treatment Packages: http://localhost:8080/IPTreatmentPackages/");
        System.out.println("- Treatment Services: http://localhost:8080/IPTreatment/");
        System.out.println("- API Documentation: http://localhost:8080/swagger-ui.html");
        System.out.println("- Health Check: http://localhost:8080/health");
        System.out.println("==============================================");
    }
}