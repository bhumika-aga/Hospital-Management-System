package com.hospital.treatment.service.dto;

import java.time.LocalDate;
import java.util.List;

public class TreatmentPlanResponse {
    private Long id;
    private PatientInfo patient;
    private PackageInfo packageDetails;
    private SpecialistInfo assignedSpecialist;
    private TreatmentSchedule schedule;
    private String status;
    
    public TreatmentPlanResponse() {
    }
    
    // Main class getters and setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public PatientInfo getPatient() {
        return patient;
    }
    
    public void setPatient(PatientInfo patient) {
        this.patient = patient;
    }
    
    public PackageInfo getPackageDetails() {
        return packageDetails;
    }
    
    public void setPackageDetails(PackageInfo packageDetails) {
        this.packageDetails = packageDetails;
    }
    
    public SpecialistInfo getAssignedSpecialist() {
        return assignedSpecialist;
    }
    
    public void setAssignedSpecialist(SpecialistInfo assignedSpecialist) {
        this.assignedSpecialist = assignedSpecialist;
    }
    
    public TreatmentSchedule getSchedule() {
        return schedule;
    }
    
    public void setSchedule(TreatmentSchedule schedule) {
        this.schedule = schedule;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    // Nested classes for organized response structure
    public static class PatientInfo {
        private Long id;
        private String name;
        private Integer age;
        private String ailment;
        private String contactNumber;
        private String email;
        private String address;
        
        public PatientInfo() {
        }
        
        public PatientInfo(Long id, String name, Integer age, String ailment, String contactNumber, String email, String address) {
            this.id = id;
            this.name = name;
            this.age = age;
            this.ailment = ailment;
            this.contactNumber = contactNumber;
            this.email = email;
            this.address = address;
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
    
    public static class PackageInfo {
        private String name;
        private String specialization;
        private List<String> tests;
        private Double cost;
        private Integer durationWeeks;
        private Integer packageLevel;
        
        public PackageInfo() {
        }
        
        public PackageInfo(String name, String specialization, List<String> tests, Double cost, Integer durationWeeks, Integer packageLevel) {
            this.name = name;
            this.specialization = specialization;
            this.tests = tests;
            this.cost = cost;
            this.durationWeeks = durationWeeks;
            this.packageLevel = packageLevel;
        }
        
        // Getters and Setters
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
    
    public static class SpecialistInfo {
        private String name;
        private String level;
        private String specialization;
        private String contactNumber;
        private String email;
        private String qualification;
        private Integer experience;
        
        public SpecialistInfo() {
        }
        
        public SpecialistInfo(String name, String level, String specialization, String contactNumber, String email, String qualification, Integer experience) {
            this.name = name;
            this.level = level;
            this.specialization = specialization;
            this.contactNumber = contactNumber;
            this.email = email;
            this.qualification = qualification;
            this.experience = experience;
        }
        
        // Getters and Setters
        public String getName() {
            return name;
        }
        
        public void setName(String name) {
            this.name = name;
        }
        
        public String getLevel() {
            return level;
        }
        
        public void setLevel(String level) {
            this.level = level;
        }
        
        public String getSpecialization() {
            return specialization;
        }
        
        public void setSpecialization(String specialization) {
            this.specialization = specialization;
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
    }
    
    public static class TreatmentSchedule {
        private LocalDate startDate;
        private LocalDate endDate;
        private Integer durationWeeks;
        private String status;
        
        public TreatmentSchedule() {
        }
        
        public TreatmentSchedule(LocalDate startDate, LocalDate endDate, Integer durationWeeks, String status) {
            this.startDate = startDate;
            this.endDate = endDate;
            this.durationWeeks = durationWeeks;
            this.status = status;
        }
        
        // Getters and Setters
        public LocalDate getStartDate() {
            return startDate;
        }
        
        public void setStartDate(LocalDate startDate) {
            this.startDate = startDate;
        }
        
        public LocalDate getEndDate() {
            return endDate;
        }
        
        public void setEndDate(LocalDate endDate) {
            this.endDate = endDate;
        }
        
        public Integer getDurationWeeks() {
            return durationWeeks;
        }
        
        public void setDurationWeeks(Integer durationWeeks) {
            this.durationWeeks = durationWeeks;
        }
        
        public String getStatus() {
            return status;
        }
        
        public void setStatus(String status) {
            this.status = status;
        }
    }
}