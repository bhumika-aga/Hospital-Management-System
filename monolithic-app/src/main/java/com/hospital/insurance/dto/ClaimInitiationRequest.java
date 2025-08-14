package com.hospital.insurance.dto;

public class ClaimInitiationRequest {
    private String patientName;
    private String ailment;
    private String treatmentPackageName;
    private String insurerName;
    private Double treatmentCost;
    private Long patientId;
    
    public ClaimInitiationRequest() {
    }
    
    public ClaimInitiationRequest(String patientName, String ailment, String treatmentPackageName, String insurerName, Double treatmentCost) {
        this.patientName = patientName;
        this.ailment = ailment;
        this.treatmentPackageName = treatmentPackageName;
        this.insurerName = insurerName;
        this.treatmentCost = treatmentCost;
    }
    
    // Getters and Setters
    public String getPatientName() {
        return patientName;
    }
    
    public void setPatientName(String patientName) {
        this.patientName = patientName;
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
    
    public String getInsurerName() {
        return insurerName;
    }
    
    public void setInsurerName(String insurerName) {
        this.insurerName = insurerName;
    }
    
    public Double getTreatmentCost() {
        return treatmentCost;
    }
    
    public void setTreatmentCost(Double treatmentCost) {
        this.treatmentCost = treatmentCost;
    }
    
    public Long getPatientId() {
        return patientId;
    }
    
    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }
}