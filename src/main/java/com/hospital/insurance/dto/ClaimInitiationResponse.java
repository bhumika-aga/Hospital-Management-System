package com.hospital.insurance.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
}