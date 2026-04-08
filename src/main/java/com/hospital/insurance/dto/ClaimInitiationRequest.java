package com.hospital.insurance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClaimInitiationRequest {
    private String patientName;
    private String ailment;
    private String treatmentPackageName;
    private String insurerName;
    private Double treatmentCost;
    private Long patientId;
}