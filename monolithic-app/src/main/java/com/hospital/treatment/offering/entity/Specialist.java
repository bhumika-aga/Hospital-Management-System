package com.hospital.treatment.offering.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "specialists")
public class Specialist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String specialization;
    
    @Column(nullable = false)
    private String level; // "JUNIOR" or "SENIOR"
    
    @Column(nullable = false)
    private String qualification;
    
    @Column(nullable = false)
    private Integer experience;
    
    @Column
    private String contactNumber;
    
    @Column
    private String email;
    
    @Column(nullable = false)
    private Boolean available = true;
    
    public Specialist() {
    }
    
    public Specialist(String name, String specialization, String level, String qualification, Integer experience, String contactNumber, String email) {
        this.name = name;
        this.specialization = specialization;
        this.level = level;
        this.qualification = qualification;
        this.experience = experience;
        this.contactNumber = contactNumber;
        this.email = email;
        this.available = true;
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