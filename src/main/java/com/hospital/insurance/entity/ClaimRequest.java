package com.hospital.insurance.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "claim_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
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
}