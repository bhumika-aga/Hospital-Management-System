package com.hospital.treatment.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientDetailRequest {
    private String name;
    private Integer age;
    private String ailment;
    private String packageName;
    private LocalDate treatmentStartDate;
    private String contactNumber;
    private String email;
    private String address;
}