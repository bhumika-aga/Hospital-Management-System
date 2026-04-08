package com.hospital.insurance.entity;

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
@Table(name = "insurers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Insurer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String insurerName;

    @Column(nullable = false)
    private String packageName;

    @Column(nullable = false)
    private Double insuranceAmountLimit;

    @Column(nullable = false)
    private Integer disbursementDurationDays;

    @Column
    private String contactEmail;

    @Column
    private String contactPhone;

    @Column
    private String address;

    @Column
    private String website;

    @Column(nullable = false)
    private Boolean active = true;

    public Insurer(String insurerName, String packageName, Double insuranceAmountLimit,
            Integer disbursementDurationDays) {
        this.insurerName = insurerName;
        this.packageName = packageName;
        this.insuranceAmountLimit = insuranceAmountLimit;
        this.disbursementDurationDays = disbursementDurationDays;
        this.active = true;
    }
}