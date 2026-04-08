package com.hospital.treatment.offering.entity;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "treatment_packages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TreatmentPackage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String specialization;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "package_tests", joinColumns = @JoinColumn(name = "package_id"))
    @Column(name = "test_name")
    private List<String> tests;

    @Column(nullable = false)
    private Double cost;

    @Column(nullable = false)
    private Integer durationWeeks;

    @Column(nullable = false)
    private Integer packageLevel; // 1 for Package 1, 2 for Package 2

    public TreatmentPackage(String name, String specialization, List<String> tests, Double cost, Integer durationWeeks,
            Integer packageLevel) {
        this.name = name;
        this.specialization = specialization;
        this.tests = tests;
        this.cost = cost;
        this.durationWeeks = durationWeeks;
        this.packageLevel = packageLevel;
    }
}