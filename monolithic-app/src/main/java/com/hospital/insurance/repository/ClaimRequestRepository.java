package com.hospital.insurance.repository;

import com.hospital.insurance.entity.ClaimRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClaimRequestRepository extends JpaRepository<ClaimRequest, Long> {
    List<ClaimRequest> findByPatientName(String patientName);
    
    List<ClaimRequest> findByClaimStatus(String claimStatus);
    
    Optional<ClaimRequest> findByPatientId(Long patientId);
    
    List<ClaimRequest> findByInsurerName(String insurerName);
    
    Optional<ClaimRequest> findByClaimReferenceNumber(String claimReferenceNumber);
}