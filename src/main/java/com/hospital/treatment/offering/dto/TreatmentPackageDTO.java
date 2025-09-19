package com.hospital.treatment.offering.dto;

import java.util.List;

public class TreatmentPackageDTO {
    private Long id;
    private String name;
    private String specialization;
    private List<String> tests;
    private Double cost;
    private Integer durationWeeks;
    private Integer packageLevel;

    public TreatmentPackageDTO() {
    }

    public TreatmentPackageDTO(Long id, String name, String specialization, List<String> tests, Double cost,
            Integer durationWeeks, Integer packageLevel) {
        this.id = id;
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