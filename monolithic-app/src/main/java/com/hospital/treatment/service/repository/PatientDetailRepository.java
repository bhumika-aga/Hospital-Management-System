package com.hospital.treatment.service.repository;

import com.hospital.treatment.service.entity.PatientDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientDetailRepository extends JpaRepository<PatientDetail, Long> {
    List<PatientDetail> findByTreatmentStatus(String treatmentStatus);
    
    List<PatientDetail> findByAilment(String ailment);
    
    List<PatientDetail> findByTreatmentPackageName(String treatmentPackageName);
    
    List<PatientDetail> findByName(String name);
}