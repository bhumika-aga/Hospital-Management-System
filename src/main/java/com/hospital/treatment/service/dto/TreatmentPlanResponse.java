package com.hospital.treatment.service.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TreatmentPlanResponse {
    private Long id;
    private PatientInfo patient;
    private PackageInfo packageDetails;
    private SpecialistInfo assignedSpecialist;
    private TreatmentSchedule schedule;
    private String status;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PatientInfo {
        private Long id;
        private String name;
        private Integer age;
        private String ailment;
        private String contactNumber;
        private String email;
        private String address;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PackageInfo {
        private String name;
        private String specialization;
        private List<String> tests;
        private Double cost;
        private Integer durationWeeks;
        private Integer packageLevel;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SpecialistInfo {
        private String name;
        private String level;
        private String specialization;
        private String contactNumber;
        private String email;
        private String qualification;
        private Integer experience;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TreatmentSchedule {
        private LocalDate startDate;
        private LocalDate endDate;
        private Integer durationWeeks;
        private String status;
    }
}