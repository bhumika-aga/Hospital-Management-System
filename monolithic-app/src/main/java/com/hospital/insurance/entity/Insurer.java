package com.hospital.insurance.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "insurers")
public class Insurer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String insurerName;
    
    @Column(nullable = false)
    private String packageName;
    
    @Column(nullable = false)
    private Double insuranceAmountLimit;
    
    @Column(nullable = false)
    private Integer disbursementDurationDays;
    
    @Column
    private String contactEmail;
    
    @Column
    private String contactPhone;
    
    @Column
    private String address;
    
    @Column
    private String website;
    
    @Column(nullable = false)
    private Boolean active = true;
    
    public Insurer() {
    }
    
    public Insurer(String insurerName, String packageName, Double insuranceAmountLimit, Integer disbursementDurationDays) {
        this.insurerName = insurerName;
        this.packageName = packageName;
        this.insuranceAmountLimit = insuranceAmountLimit;
        this.disbursementDurationDays = disbursementDurationDays;
        this.active = true;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getInsurerName() {
        return insurerName;
    }
    
    public void setInsurerName(String insurerName) {
        this.insurerName = insurerName;
    }
    
    public String getPackageName() {
        return packageName;
    }
    
    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }
    
    public Double getInsuranceAmountLimit() {
        return insuranceAmountLimit;
    }
    
    public void setInsuranceAmountLimit(Double insuranceAmountLimit) {
        this.insuranceAmountLimit = insuranceAmountLimit;
    }
    
    public Integer getDisbursementDurationDays() {
        return disbursementDurationDays;
    }
    
    public void setDisbursementDurationDays(Integer disbursementDurationDays) {
        this.disbursementDurationDays = disbursementDurationDays;
    }
    
    public String getContactEmail() {
        return contactEmail;
    }
    
    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }
    
    public String getContactPhone() {
        return contactPhone;
    }
    
    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public String getWebsite() {
        return website;
    }
    
    public void setWebsite(String website) {
        this.website = website;
    }
    
    public Boolean getActive() {
        return active;
    }
    
    public void setActive(Boolean active) {
        this.active = active;
    }
}