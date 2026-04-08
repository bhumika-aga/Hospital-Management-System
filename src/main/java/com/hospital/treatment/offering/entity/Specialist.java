package com.hospital.treatment.offering.entity;

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
@Table(name = "specialists")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Specialist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String specialization;

    @Column(nullable = false)
    private String level; // "JUNIOR" or "SENIOR"

    @Column(nullable = false)
    private String qualification;

    @Column(nullable = false)
    private Integer experience;

    @Column
    private String contactNumber;

    @Column
    private String email;

    @Column(nullable = false)
    private Boolean available = true;

    public Specialist(String name, String specialization, String level, String qualification, Integer experience,
            String contactNumber, String email) {
        this.name = name;
        this.specialization = specialization;
        this.level = level;
        this.qualification = qualification;
        this.experience = experience;
        this.contactNumber = contactNumber;
        this.email = email;
        this.available = true;
    }
}