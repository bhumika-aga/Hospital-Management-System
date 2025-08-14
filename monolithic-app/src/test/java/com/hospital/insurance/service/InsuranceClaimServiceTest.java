package com.hospital.insurance.service;

import com.hospital.insurance.dto.ClaimInitiationRequest;
import com.hospital.insurance.dto.ClaimInitiationResponse;
import com.hospital.insurance.dto.InsurerDTO;
import com.hospital.insurance.entity.ClaimRequest;
import com.hospital.insurance.entity.Insurer;
import com.hospital.insurance.repository.ClaimRequestRepository;
import com.hospital.insurance.repository.InsurerRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InsuranceClaimServiceTest {

    @Mock
    private InsurerRepository insurerRepository;

    @Mock
    private ClaimRequestRepository claimRequestRepository;

    @InjectMocks
    private InsuranceClaimService insuranceClaimService;

    @Test
    void initiateClaim_WithValidRequest_ShouldReturnSuccessResponse() {
        // Given
        ClaimInitiationRequest request = new ClaimInitiationRequest();
        request.setPatientName("John Doe");
        request.setTreatmentCost(5000.0);
        request.setInsurerId(1L);

        Insurer insurer = new Insurer("Test Insurance", "Health Package", 10000.0, 7);
        ClaimRequest savedClaim = new ClaimRequest();
        savedClaim.setId(1L);
        savedClaim.setStatus("INITIATED");

        when(insurerRepository.findById(anyLong())).thenReturn(Optional.of(insurer));
        when(claimRequestRepository.save(any(ClaimRequest.class))).thenReturn(savedClaim);

        // When
        ClaimInitiationResponse response = insuranceClaimService.initiateClaim(request);

        // Then
        assertNotNull(response);
        assertEquals("INITIATED", response.getStatus());
        assertEquals(1L, response.getClaimId());
        verify(claimRequestRepository, times(1)).save(any(ClaimRequest.class));
    }

    @Test
    void initiateClaim_WithInvalidInsurer_ShouldThrowException() {
        // Given
        ClaimInitiationRequest request = new ClaimInitiationRequest();
        request.setInsurerId(999L);

        when(insurerRepository.findById(anyLong())).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> {
            insuranceClaimService.initiateClaim(request);
        });
    }

    @Test
    void getAllInsurerDetails_ShouldReturnInsurerList() {
        // Given
        List<Insurer> insurers = Arrays.asList(
            new Insurer("Insurance A", "Package A", 5000.0, 5),
            new Insurer("Insurance B", "Package B", 7000.0, 7)
        );

        when(insurerRepository.findAll()).thenReturn(insurers);

        // When
        List<InsurerDTO> result = insuranceClaimService.getAllInsurerDetails();

        // Then
        assertEquals(2, result.size());
        assertEquals("Insurance A", result.get(0).getInsurerName());
        assertEquals("Insurance B", result.get(1).getInsurerName());
    }

    @Test
    void calculateCoverageAmount_ShouldReturnCorrectAmount() {
        // Given
        double treatmentCost = 8000.0;
        double insuranceLimit = 5000.0;

        // When
        double coverageAmount = insuranceClaimService.calculateCoverageAmount(treatmentCost, insuranceLimit);

        // Then
        assertEquals(5000.0, coverageAmount); // Should be capped at insurance limit
    }

    @Test
    void calculateCoverageAmount_WhenCostLessThanLimit_ShouldReturnFullCost() {
        // Given
        double treatmentCost = 3000.0;
        double insuranceLimit = 5000.0;

        // When
        double coverageAmount = insuranceClaimService.calculateCoverageAmount(treatmentCost, insuranceLimit);

        // Then
        assertEquals(3000.0, coverageAmount); // Should return full treatment cost
    }
}