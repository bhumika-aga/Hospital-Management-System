package com.hospital.insurance.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "claim_requests")
public class ClaimRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String patientName;
    
    @Column(nullable = false)
    private String ailment;
    
    @Column(nullable = false)
    private String treatmentPackageName;
    
    @Column(nullable = false)
    private Double treatmentCost;
    
    @Column(nullable = false)
    private String insurerName;
    
    @Column(nullable = false)
    private String insurerPackageName;
    
    @Column(nullable = false)
    private Double insuranceAmountLimit;
    
    @Column(nullable = false)
    private Double balanceAmount;
    
    @Column(nullable = false)
    private String claimStatus = "INITIATED";
    
    @Column(nullable = false)
    private LocalDateTime claimInitiatedDate;
    
    @Column
    private LocalDateTime expectedDisbursementDate;
    
    @Column
    private String claimReferenceNumber;
    
    @Column
    private Long patientId;
    
    public ClaimRequest() {
    }
    
    public ClaimRequest(String patientName, String ailment, String treatmentPackageName, Double treatmentCost,
                        String insurerName, String insurerPackageName, Double insuranceAmountLimit, Double balanceAmount) {
        this.patientName = patientName;
        this.ailment = ailment;
        this.treatmentPackageName = treatmentPackageName;
        this.treatmentCost = treatmentCost;
        this.insurerName = insurerName;
        this.insurerPackageName = insurerPackageName;
        this.insuranceAmountLimit = insuranceAmountLimit;
        this.balanceAmount = balanceAmount;
        this.claimStatus = "INITIATED";
        this.claimInitiatedDate = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
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
    
    public Double getTreatmentCost() {
        return treatmentCost;
    }
    
    public void setTreatmentCost(Double treatmentCost) {
        this.treatmentCost = treatmentCost;
    }
    
    public String getInsurerName() {
        return insurerName;
    }
    
    public void setInsurerName(String insurerName) {
        this.insurerName = insurerName;
    }
    
    public String getInsurerPackageName() {
        return insurerPackageName;
    }
    
    public void setInsurerPackageName(String insurerPackageName) {
        this.insurerPackageName = insurerPackageName;
    }
    
    public Double getInsuranceAmountLimit() {
        return insuranceAmountLimit;
    }
    
    public void setInsuranceAmountLimit(Double insuranceAmountLimit) {
        this.insuranceAmountLimit = insuranceAmountLimit;
    }
    
    public Double getBalanceAmount() {
        return balanceAmount;
    }
    
    public void setBalanceAmount(Double balanceAmount) {
        this.balanceAmount = balanceAmount;
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
    
    public String getClaimReferenceNumber() {
        return claimReferenceNumber;
    }
    
    public void setClaimReferenceNumber(String claimReferenceNumber) {
        this.claimReferenceNumber = claimReferenceNumber;
    }
    
    public Long getPatientId() {
        return patientId;
    }
    
    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }
}