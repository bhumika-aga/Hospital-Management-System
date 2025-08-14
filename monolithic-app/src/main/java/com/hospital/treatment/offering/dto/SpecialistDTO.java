package com.hospital.treatment.offering.dto;

public class SpecialistDTO {
    private Long id;
    private String name;
    private String specialization;
    private String level;
    private String qualification;
    private Integer experience;
    private String contactNumber;
    private String email;
    private Boolean available;
    
    public SpecialistDTO() {
    }
    
    public SpecialistDTO(Long id, String name, String specialization, String level, String qualification, Integer experience, String contactNumber, String email, Boolean available) {
        this.id = id;
        this.name = name;
        this.specialization = specialization;
        this.level = level;
        this.qualification = qualification;
        this.experience = experience;
        this.contactNumber = contactNumber;
        this.email = email;
        this.available = available;
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
    
    public String getLevel() {
        return level;
    }
    
    public void setLevel(String level) {
        this.level = level;
    }
    
    public String getQualification() {
        return qualification;
    }
    
    public void setQualification(String qualification) {
        this.qualification = qualification;
    }
    
    public Integer getExperience() {
        return experience;
    }
    
    public void setExperience(Integer experience) {
        this.experience = experience;
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
    
    public Boolean getAvailable() {
        return available;
    }
    
    public void setAvailable(Boolean available) {
        this.available = available;
    }
}