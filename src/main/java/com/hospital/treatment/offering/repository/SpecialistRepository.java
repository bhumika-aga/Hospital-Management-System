package com.hospital.treatment.offering.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hospital.treatment.offering.entity.Specialist;

@Repository
public interface SpecialistRepository extends JpaRepository<Specialist, Long> {
    List<Specialist> findBySpecialization(String specialization);

    List<Specialist> findByLevel(String level);

    List<Specialist> findBySpecializationAndLevel(String specialization, String level);

    List<Specialist> findByAvailable(Boolean available);
}