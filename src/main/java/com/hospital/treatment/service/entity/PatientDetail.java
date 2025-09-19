package com.hospital.treatment.service.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "patient_details")
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

    public PatientDetail() {
    }

    public PatientDetail(String name, Integer age, String ailment, String treatmentPackageName,
            LocalDate treatmentStartDate) {
        this.name = name;
        this.age = age;
        this.ailment = ailment;
        this.treatmentPackageName = treatmentPackageName;
        this.treatmentStartDate = treatmentStartDate;
        this.treatmentStatus = "IN_PROGRESS";
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

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getAilment() {
        return ailment;
    }

    public void setAilment(String ailment) {
        this.ailment = ailment;
    }

    public String getTreatmentPackageName() {
        return treatmentPackageName;
    }

    public void setTreatmentPackageName(String treatmentPackageName) {
        this.treatmentPackageName = treatmentPackageName;
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

    public String getTreatmentStatus() {
        return treatmentStatus;
    }

    public void setTreatmentStatus(String treatmentStatus) {
        this.treatmentStatus = treatmentStatus;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getInsuranceProvider() {
        return insuranceProvider;
    }

    public void setInsuranceProvider(String insuranceProvider) {
        this.insuranceProvider = insuranceProvider;
    }
}