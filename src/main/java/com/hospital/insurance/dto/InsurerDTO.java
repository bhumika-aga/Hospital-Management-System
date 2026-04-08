package com.hospital.insurance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
}