package com.hospital.treatment.offering.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SpecialistDTO {
    private Long id;
    private String name;
    private String specialization;
    private String level;
    private String qualification;
    private Integer experience;
    private String contactNumber;
    private String email;
    private Boolean available;
}