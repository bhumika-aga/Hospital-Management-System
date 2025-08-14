package com.hospital.insurance.dto;

import java.time.LocalDateTime;

public class ClaimInitiationResponse {
    private Long claimId;
    private String claimReferenceNumber;
    private String patientName;
    private String insurerName;
    private Double treatmentCost;
    private Double insuranceCoverage;
    private Double balanceAmountToBePaid;
    private String claimStatus;
    private LocalDateTime claimInitiatedDate;
    private LocalDateTime expectedDisbursementDate;
    private String message;
    
    public ClaimInitiationResponse() {
    }
    
    public ClaimInitiationResponse(Long claimId, String claimReferenceNumber, String patientName, String insurerName,
                                   Double treatmentCost, Double insuranceCoverage, Double balanceAmountToBePaid,
                                   String claimStatus, LocalDateTime claimInitiatedDate, LocalDateTime expectedDisbursementDate,
                                   String message) {
        this.claimId = claimId;
        this.claimReferenceNumber = claimReferenceNumber;
        this.patientName = patientName;
        this.insurerName = insurerName;
        this.treatmentCost = treatmentCost;
        this.insuranceCoverage = insuranceCoverage;
        this.balanceAmountToBePaid = balanceAmountToBePaid;
        this.claimStatus = claimStatus;
        this.claimInitiatedDate = claimInitiatedDate;
        this.expectedDisbursementDate = expectedDisbursementDate;
        this.message = message;
    }
    
    // Getters and Setters
    public Long getClaimId() {
        return claimId;
    }
    
    public void setClaimId(Long claimId) {
        this.claimId = claimId;
    }
    
    public String getClaimReferenceNumber() {
        return claimReferenceNumber;
    }
    
    public void setClaimReferenceNumber(String claimReferenceNumber) {
        this.claimReferenceNumber = claimReferenceNumber;
    }
    
    public String getPatientName() {
        return patientName;
    }
    
    public void setPatientName(String patientName) {
        this.patientName = patientName;
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
    
    public Double getInsuranceCoverage() {
        return insuranceCoverage;
    }
    
    public void setInsuranceCoverage(Double insuranceCoverage) {
        this.insuranceCoverage = insuranceCoverage;
    }
    
    public Double getBalanceAmountToBePaid() {
        return balanceAmountToBePaid;
    }
    
    public void setBalanceAmountToBePaid(Double balanceAmountToBePaid) {
        this.balanceAmountToBePaid = balanceAmountToBePaid;
    }
    
    public String getClaimStatus() {
        return claimStatus;
    }
    
    public void setClaimStatus(String claimStatus) {
        this.claimStatus = claimStatus;
    }
    
    public LocalDateTime getClaimInitiatedDate() {
        return claimInitiatedDate;
    }
    
    public void setClaimInitiatedDate(LocalDateTime claimInitiatedDate) {
        this.claimInitiatedDate = claimInitiatedDate;
    }
    
    public LocalDateTime getExpectedDisbursementDate() {
        return expectedDisbursementDate;
    }
    
    public void setExpectedDisbursementDate(LocalDateTime expectedDisbursementDate) {
        this.expectedDisbursementDate = expectedDisbursementDate;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
}