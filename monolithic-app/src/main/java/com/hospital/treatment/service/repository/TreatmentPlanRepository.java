package com.hospital.treatment.service.repository;

import com.hospital.treatment.service.entity.TreatmentPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TreatmentPlanRepository extends JpaRepository<TreatmentPlan, Long> {
    Optional<TreatmentPlan> findByPatientId(Long patientId);
    
    List<TreatmentPlan> findBySpecializationAndStatus(String specialization, String status);
    
    List<TreatmentPlan> findBySpecialistName(String specialistName);
    
    List<TreatmentPlan> findByStatus(String status);
    
    List<TreatmentPlan> findByPackageName(String packageName);
}