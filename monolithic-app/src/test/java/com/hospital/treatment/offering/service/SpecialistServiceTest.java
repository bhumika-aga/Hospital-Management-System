package com.hospital.treatment.offering.service;

import com.hospital.treatment.offering.dto.SpecialistDTO;
import com.hospital.treatment.offering.entity.Specialist;
import com.hospital.treatment.offering.repository.SpecialistRepository;
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
class SpecialistServiceTest {

    @Mock
    private SpecialistRepository specialistRepository;

    @InjectMocks
    private SpecialistService specialistService;

    @Test
    void getAllSpecialists_ShouldReturnSpecialistList() {
        // Given
        List<Specialist> specialists = Arrays.asList(
            new Specialist("Dr. Smith", "Cardiology", "SENIOR", "MD, FACC", 15, "+1234567890", "dr.smith@hospital.com", true),
            new Specialist("Dr. Johnson", "Orthopedics", "JUNIOR", "MD", 5, "+1234567891", "dr.johnson@hospital.com", true)
        );

        when(specialistRepository.findAll()).thenReturn(specialists);

        // When
        List<SpecialistDTO> result = specialistService.getAllSpecialists();

        // Then
        assertEquals(2, result.size());
        assertEquals("Dr. Smith", result.get(0).getName());
        assertEquals("Dr. Johnson", result.get(1).getName());
    }

    @Test
    void getSpecialistById_WithValidId_ShouldReturnSpecialist() {
        // Given
        Long specialistId = 1L;
        Specialist specialist = new Specialist("Dr. Smith", "Cardiology", "SENIOR", "MD, FACC", 15, "+1234567890", "dr.smith@hospital.com", true);
        specialist.setId(specialistId);

        when(specialistRepository.findById(anyLong())).thenReturn(Optional.of(specialist));

        // When
        SpecialistDTO result = specialistService.getSpecialistById(specialistId);

        // Then
        assertNotNull(result);
        assertEquals("Dr. Smith", result.getName());
        assertEquals("Cardiology", result.getSpecialization());
        assertEquals("SENIOR", result.getLevel());
    }

    @Test
    void getSpecialistById_WithInvalidId_ShouldThrowException() {
        // Given
        Long invalidId = 999L;
        when(specialistRepository.findById(anyLong())).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> {
            specialistService.getSpecialistById(invalidId);
        });
    }

    @Test
    void createSpecialist_ShouldReturnCreatedSpecialist() {
        // Given
        SpecialistDTO specialistDTO = new SpecialistDTO();
        specialistDTO.setName("Dr. Brown");
        specialistDTO.setSpecialization("Neurology");
        specialistDTO.setLevel("SENIOR");
        specialistDTO.setQualifications("MD, PhD");
        specialistDTO.setExperienceYears(20);
        specialistDTO.setContactNumber("+1234567892");
        specialistDTO.setEmail("dr.brown@hospital.com");
        specialistDTO.setActive(true);

        Specialist savedSpecialist = new Specialist("Dr. Brown", "Neurology", "SENIOR", "MD, PhD", 20, "+1234567892", "dr.brown@hospital.com", true);
        savedSpecialist.setId(1L);

        when(specialistRepository.save(any(Specialist.class))).thenReturn(savedSpecialist);

        // When
        SpecialistDTO result = specialistService.createSpecialist(specialistDTO);

        // Then
        assertNotNull(result);
        assertEquals("Dr. Brown", result.getName());
        assertEquals("Neurology", result.getSpecialization());
        verify(specialistRepository, times(1)).save(any(Specialist.class));
    }

    @Test
    void updateSpecialist_WithValidId_ShouldReturnUpdatedSpecialist() {
        // Given
        Long specialistId = 1L;
        Specialist existingSpecialist = new Specialist("Dr. Smith", "Cardiology", "SENIOR", "MD, FACC", 15, "+1234567890", "dr.smith@hospital.com", true);
        existingSpecialist.setId(specialistId);

        SpecialistDTO updateDTO = new SpecialistDTO();
        updateDTO.setName("Dr. Smith Updated");
        updateDTO.setSpecialization("Cardiology");
        updateDTO.setLevel("SENIOR");
        updateDTO.setQualifications("MD, FACC, FAHA");
        updateDTO.setExperienceYears(16);
        updateDTO.setContactNumber("+1234567890");
        updateDTO.setEmail("dr.smith.updated@hospital.com");
        updateDTO.setActive(true);

        when(specialistRepository.findById(anyLong())).thenReturn(Optional.of(existingSpecialist));
        when(specialistRepository.save(any(Specialist.class))).thenReturn(existingSpecialist);

        // When
        SpecialistDTO result = specialistService.updateSpecialist(specialistId, updateDTO);

        // Then
        assertNotNull(result);
        assertEquals("Dr. Smith Updated", result.getName());
        assertEquals("MD, FACC, FAHA", result.getQualifications());
        verify(specialistRepository, times(1)).save(any(Specialist.class));
    }

    @Test
    void getSpecialistsBySpecialization_ShouldReturnFilteredList() {
        // Given
        String specialization = "Cardiology";
        List<Specialist> specialists = Arrays.asList(
            new Specialist("Dr. Smith", "Cardiology", "SENIOR", "MD, FACC", 15, "+1234567890", "dr.smith@hospital.com", true),
            new Specialist("Dr. Brown", "Cardiology", "JUNIOR", "MD", 8, "+1234567891", "dr.brown@hospital.com", true)
        );

        when(specialistRepository.findBySpecializationIgnoreCase(specialization)).thenReturn(specialists);

        // When
        List<SpecialistDTO> result = specialistService.getSpecialistsBySpecialization(specialization);

        // Then
        assertEquals(2, result.size());
        assertTrue(result.stream().allMatch(s -> s.getSpecialization().equals("Cardiology")));
    }
}