package com.hospital.insurance.dto;

public class InsurerDTO {
    private Long id;
    private String insurerName;
    private String packageName;
    private Double insuranceAmountLimit;
    private Integer disbursementDurationDays;
    private String contactEmail;
    private String contactPhone;
    private String address;
    private String website;
    private Boolean active;
    
    public InsurerDTO() {
    }
    
    public InsurerDTO(Long id, String insurerName, String packageName, Double insuranceAmountLimit,
                      Integer disbursementDurationDays, String contactEmail, String contactPhone,
                      String address, String website, Boolean active) {
        this.id = id;
        this.insurerName = insurerName;
        this.packageName = packageName;
        this.insuranceAmountLimit = insuranceAmountLimit;
        this.disbursementDurationDays = disbursementDurationDays;
        this.contactEmail = contactEmail;
        this.contactPhone = contactPhone;
        this.address = address;
        this.website = website;
        this.active = active;
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