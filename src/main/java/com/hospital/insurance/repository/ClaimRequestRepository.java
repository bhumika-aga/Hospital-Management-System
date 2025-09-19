package com.hospital.insurance.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hospital.insurance.entity.ClaimRequest;

@Repository
public interface ClaimRequestRepository extends JpaRepository<ClaimRequest, Long> {
    List<ClaimRequest> findByPatientName(String patientName);

    List<ClaimRequest> findByClaimStatus(String claimStatus);

    Optional<ClaimRequest> findByPatientId(Long patientId);

    List<ClaimRequest> findByInsurerName(String insurerName);

    Optional<ClaimRequest> findByClaimReferenceNumber(String claimReferenceNumber);
}