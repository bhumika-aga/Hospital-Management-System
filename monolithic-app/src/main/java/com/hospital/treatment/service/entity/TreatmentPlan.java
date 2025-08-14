package com.hospital.treatment.service.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "treatment_plans")
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
    
    public TreatmentPlan() {
    }
    
    public TreatmentPlan(Long patientId, String packageName, List<String> testDetails, Double cost,
                         String specialistName, String specialistLevel, String specialization,
                         LocalDate treatmentStartDate, LocalDate treatmentEndDate, Integer durationWeeks) {
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
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getPatientId() {
        return patientId;
    }
    
    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }
    
    public String getPackageName() {
        return packageName;
    }
    
    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }
    
    public List<String> getTestDetails() {
        return testDetails;
    }
    
    public void setTestDetails(List<String> testDetails) {
        this.testDetails = testDetails;
    }
    
    public Double getCost() {
        return cost;
    }
    
    public void setCost(Double cost) {
        this.cost = cost;
    }
    
    public String getSpecialistName() {
        return specialistName;
    }
    
    public void setSpecialistName(String specialistName) {
        this.specialistName = specialistName;
    }
    
    public String getSpecialistLevel() {
        return specialistLevel;
    }
    
    public void setSpecialistLevel(String specialistLevel) {
        this.specialistLevel = specialistLevel;
    }
    
    public String getSpecialization() {
        return specialization;
    }
    
    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }
    
    public LocalDate getTreatmentStartDate() {
        return treatmentStartDate;
    }
    
    public void setTreatmentStartDate(LocalDate treatmentStartDate) {
        this.treatmentStartDate = treatmentStartDate;
    }
    
    public LocalDate getTreatmentEndDate() {
        return treatmentEndDate;
    }
    
    public void setTreatmentEndDate(LocalDate treatmentEndDate) {
        this.treatmentEndDate = treatmentEndDate;
    }
    
    public Integer getDurationWeeks() {
        return durationWeeks;
    }
    
    public void setDurationWeeks(Integer durationWeeks) {
        this.durationWeeks = durationWeeks;
    }
    
    public String getSpecialistContactNumber() {
        return specialistContactNumber;
    }
    
    public void setSpecialistContactNumber(String specialistContactNumber) {
        this.specialistContactNumber = specialistContactNumber;
    }
    
    public String getSpecialistEmail() {
        return specialistEmail;
    }
    
    public void setSpecialistEmail(String specialistEmail) {
        this.specialistEmail = specialistEmail;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
}