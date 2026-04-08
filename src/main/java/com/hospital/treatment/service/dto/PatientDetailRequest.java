package com.hospital.treatment.service.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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