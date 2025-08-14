package com.hospital.treatment.service.dto;

import java.time.LocalDate;

public class PatientDetailRequest {
    private String name;
    private Integer age;
    private String ailment;
    private String packageName;
    private LocalDate treatmentStartDate;
    private String contactNumber;
    private String email;
    private String address;
    
    public PatientDetailRequest() {
    }
    
    public PatientDetailRequest(String name, Integer age, String ailment, String packageName, LocalDate treatmentStartDate) {
        this.name = name;
        this.age = age;
        this.ailment = ailment;
        this.packageName = packageName;
        this.treatmentStartDate = treatmentStartDate;
    }
    
    // Getters and Setters
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
    
    public String getPackageName() {
        return packageName;
    }
    
    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }
    
    public LocalDate getTreatmentStartDate() {
        return treatmentStartDate;
    }
    
    public void setTreatmentStartDate(LocalDate treatmentStartDate) {
        this.treatmentStartDate = treatmentStartDate;
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
}