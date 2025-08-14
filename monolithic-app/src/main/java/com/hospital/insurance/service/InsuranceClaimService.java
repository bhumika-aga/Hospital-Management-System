package com.hospital.insurance.service;

import com.hospital.insurance.dto.ClaimInitiationRequest;
import com.hospital.insurance.dto.ClaimInitiationResponse;
import com.hospital.insurance.dto.InsurerDTO;
import com.hospital.insurance.entity.ClaimRequest;
import com.hospital.insurance.entity.Insurer;
import com.hospital.insurance.repository.ClaimRequestRepository;
import com.hospital.insurance.repository.InsurerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class InsuranceClaimService {
    
    @Autowired
    private InsurerRepository insurerRepository;
    
    @Autowired
    private ClaimRequestRepository claimRequestRepository;
    
    public List<InsurerDTO> getAllInsurerDetails() {
        return insurerRepository.findByActive(true)
                   .stream()
                   .map(this::convertToDTO)
                   .collect(Collectors.toList());
    }
    
    public InsurerDTO getInsurerByPackageName(String packageName) {
        List<Insurer> insurers = insurerRepository.findByPackageName(packageName);
        if (insurers.isEmpty()) {
            throw new RuntimeException("No insurer found for package: " + packageName);
        }
        
        // Return the first active insurer for the package
        Insurer insurer = insurers.stream()
                              .filter(Insurer::getActive)
                              .findFirst()
                              .orElseThrow(() -> new RuntimeException("No active insurer found for package: " + packageName));
        
        return convertToDTO(insurer);
    }
    
    public ClaimInitiationResponse initiateClaim(ClaimInitiationRequest request) {
        // Find the selected insurer
        Insurer insurer = insurerRepository.findByInsurerName(request.getInsurerName())
                              .orElseThrow(() -> new RuntimeException("Insurer not found: " + request.getInsurerName()));
        
        if (!insurer.getActive()) {
            throw new RuntimeException("Insurer is not active: " + request.getInsurerName());
        }
        
        // Calculate balance amount (treatment cost - insurance coverage)
        double insuranceCoverage = Math.min(request.getTreatmentCost(), insurer.getInsuranceAmountLimit());
        double balanceAmount = Math.max(0, request.getTreatmentCost() - insuranceCoverage);
        
        // Generate claim reference number
        String claimReferenceNumber = generateClaimReferenceNumber(insurer.getInsurerName());
        
        // Calculate expected disbursement date
        LocalDateTime expectedDisbursementDate = LocalDateTime.now().plusDays(insurer.getDisbursementDurationDays());
        
        // Create claim request
        ClaimRequest claimRequest = new ClaimRequest(
            request.getPatientName(),
            request.getAilment(),
            request.getTreatmentPackageName(),
            request.getTreatmentCost(),
            insurer.getInsurerName(),
            insurer.getPackageName(),
            insurer.getInsuranceAmountLimit(),
            balanceAmount
        );
        
        claimRequest.setClaimReferenceNumber(claimReferenceNumber);
        claimRequest.setExpectedDisbursementDate(expectedDisbursementDate);
        claimRequest.setPatientId(request.getPatientId());
        
        ClaimRequest savedClaim = claimRequestRepository.save(claimRequest);
        
        // Build response
        return new ClaimInitiationResponse(
            savedClaim.getId(),
            claimReferenceNumber,
            request.getPatientName(),
            insurer.getInsurerName(),
            request.getTreatmentCost(),
            insuranceCoverage,
            balanceAmount,
            "INITIATED",
            savedClaim.getClaimInitiatedDate(),
            expectedDisbursementDate,
            "Insurance claim initiated successfully. Patient needs to pay balance amount: ₹" + String.format("%.2f", balanceAmount)
        );
    }
    
    public List<ClaimRequest> getClaimsByStatus(String status) {
        return claimRequestRepository.findByClaimStatus(status.toUpperCase());
    }
    
    public ClaimRequest getClaimByPatientId(Long patientId) {
        return claimRequestRepository.findByPatientId(patientId)
                   .orElseThrow(() -> new RuntimeException("No claim found for patient ID: " + patientId));
    }
    
    public ClaimRequest getClaimByReferenceNumber(String referenceNumber) {
        return claimRequestRepository.findByClaimReferenceNumber(referenceNumber)
                   .orElseThrow(() -> new RuntimeException("Claim not found with reference number: " + referenceNumber));
    }
    
    public ClaimRequest updateClaimStatus(Long claimId, String newStatus) {
        ClaimRequest claim = claimRequestRepository.findById(claimId)
                                 .orElseThrow(() -> new RuntimeException("Claim not found with ID: " + claimId));
        
        claim.setClaimStatus(newStatus.toUpperCase());
        return claimRequestRepository.save(claim);
    }
    
    private InsurerDTO convertToDTO(Insurer insurer) {
        return new InsurerDTO(
            insurer.getId(),
            insurer.getInsurerName(),
            insurer.getPackageName(),
            insurer.getInsuranceAmountLimit(),
            insurer.getDisbursementDurationDays(),
            insurer.getContactEmail(),
            insurer.getContactPhone(),
            insurer.getAddress(),
            insurer.getWebsite(),
            insurer.getActive()
        );
    }
    
    private String generateClaimReferenceNumber(String insurerName) {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String insurerCode = insurerName.replaceAll("\\s+", "").substring(0, Math.min(3, insurerName.length())).toUpperCase();
        return "MF-" + insurerCode + "-" + timestamp;
    }
}