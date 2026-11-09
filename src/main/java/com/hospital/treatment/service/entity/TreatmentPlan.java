package com.hospital.treatment.service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "treatment_plans")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TreatmentPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Long patientId;
    
    @Column(nullable = false)
    private String packageName;
    
    @ElementCollection
    @CollectionTable(name = "treatment_tests", joinColumns = @JoinColumn(name = "treatment_plan_id"))
    @Column(name = "test_name")
    private List<String> testDetails;
    
    @Column(nullable = false)
    private Double cost;
    
    @Column(nullable = false)
    private String specialistName;
    
    @Column(nullable = false)
    private String specialistLevel;
    
    @Column(nullable = false)
    private String specialization;
    
    @Column(nullable = false)
    private LocalDate treatmentStartDate;
    
    @Column(nullable = false)
    private LocalDate treatmentEndDate;
    
    @Column(nullable = false)
    private Integer durationWeeks;
    
    @Column
    private String specialistContactNumber;
    
    @Column
    private String specialistEmail;
    
    @Column(nullable = false)
    private String status = "SCHEDULED";
    
    public TreatmentPlan(Long patientId, String packageName, List<String> testDetails, Double cost,
                         String specialistName, String specialistLevel, String specialization, LocalDate treatmentStartDate,
                         LocalDate treatmentEndDate, Integer durationWeeks) {
        this.patientId = patientId;
        this.packageName = packageName;
        this.testDetails = testDetails;
        this.cost = cost;
        this.specialistName = specialistName;
        this.specialistLevel = specialistLevel;
        this.specialization = specialization;
        this.treatmentStartDate = treatmentStartDate;
        this.treatmentEndDate = treatmentEndDate;
        this.durationWeeks = durationWeeks;
        this.status = "SCHEDULED";
    }
}