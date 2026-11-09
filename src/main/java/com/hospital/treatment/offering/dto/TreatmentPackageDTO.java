package com.hospital.treatment.offering.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TreatmentPackageDTO {
    private Long id;
    private String name;
    private String specialization;
    private List<String> tests;
    private Double cost;
    private Integer durationWeeks;
    private Integer packageLevel;
}