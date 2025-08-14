package com.hospital.treatment.offering.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "treatment_packages")
public class TreatmentPackage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String specialization;
    
    @ElementCollection
    @CollectionTable(name = "package_tests", joinColumns = @JoinColumn(name = "package_id"))
    @Column(name = "test_name")
    private List<String> tests;
    
    @Column(nullable = false)
    private Double cost;
    
    @Column(nullable = false)
    private Integer durationWeeks;
    
    @Column(nullable = false)
    private Integer packageLevel; // 1 for Package 1, 2 for Package 2
    
    public TreatmentPackage() {
    }
    
    public TreatmentPackage(String name, String specialization, List<String> tests, Double cost, Integer durationWeeks, Integer packageLevel) {
        this.name = name;
        this.specialization = specialization;
        this.tests = tests;
        this.cost = cost;
        this.durationWeeks = durationWeeks;
        this.packageLevel = packageLevel;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getSpecialization() {
        return specialization;
    }
    
    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }
    
    public List<String> getTests() {
        return tests;
    }
    
    public void setTests(List<String> tests) {
        this.tests = tests;
    }
    
    public Double getCost() {
        return cost;
    }
    
    public void setCost(Double cost) {
        this.cost = cost;
    }
    
    public Integer getDurationWeeks() {
        return durationWeeks;
    }
    
    public void setDurationWeeks(Integer durationWeeks) {
        this.durationWeeks = durationWeeks;
    }
    
    public Integer getPackageLevel() {
        return packageLevel;
    }
    
    public void setPackageLevel(Integer packageLevel) {
        this.packageLevel = packageLevel;
    }
}