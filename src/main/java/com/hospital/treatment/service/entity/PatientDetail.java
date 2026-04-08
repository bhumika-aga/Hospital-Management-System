package com.hospital.treatment.service.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "patient_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false)
    private String ailment;

    @Column(nullable = false)
    private String treatmentPackageName;

    @Column(nullable = false)
    private LocalDate treatmentStartDate;

    @Column
    private LocalDate treatmentEndDate;

    @Column(nullable = false)
    private String treatmentStatus = "IN_PROGRESS";

    @Column
    private String contactNumber;

    @Column
    private String email;

    @Column
    private String address;

    @Column
    private String insuranceProvider;

    public PatientDetail(String name, Integer age, String ailment, String treatmentPackageName,
            LocalDate treatmentStartDate) {
        this.name = name;
        this.age = age;
        this.ailment = ailment;
        this.treatmentPackageName = treatmentPackageName;
        this.treatmentStartDate = treatmentStartDate;
        this.treatmentStatus = "IN_PROGRESS";
    }
}