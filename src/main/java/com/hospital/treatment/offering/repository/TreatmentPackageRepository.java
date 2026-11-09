package com.hospital.treatment.offering.repository;

import com.hospital.treatment.offering.entity.TreatmentPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TreatmentPackageRepository extends JpaRepository<TreatmentPackage, Long> {
    List<TreatmentPackage> findBySpecialization(String specialization);
    
    Optional<TreatmentPackage> findByName(String name);
    
    List<TreatmentPackage> findByPackageLevel(Integer packageLevel);
}