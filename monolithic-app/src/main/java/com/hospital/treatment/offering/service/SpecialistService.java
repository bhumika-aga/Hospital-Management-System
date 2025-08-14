package com.hospital.treatment.offering.service;

import com.hospital.treatment.offering.dto.SpecialistDTO;
import com.hospital.treatment.offering.entity.Specialist;
import com.hospital.treatment.offering.repository.SpecialistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SpecialistService {
    
    @Autowired
    private SpecialistRepository specialistRepository;
    
    public List<SpecialistDTO> getAllSpecialists() {
        return specialistRepository.findAll()
                   .stream()
                   .map(this::convertToDTO)
                   .collect(Collectors.toList());
    }
    
    public List<SpecialistDTO> getSpecialistsByExpertise(String expertise) {
        return specialistRepository.findBySpecialization(expertise)
                   .stream()
                   .map(this::convertToDTO)
                   .collect(Collectors.toList());
    }
    
    public List<SpecialistDTO> getSpecialistsByLevel(String level) {
        return specialistRepository.findByLevel(level.toUpperCase())
                   .stream()
                   .map(this::convertToDTO)
                   .collect(Collectors.toList());
    }
    
    public List<SpecialistDTO> getAvailableSpecialists(String specialization, String level) {
        return specialistRepository.findBySpecializationAndLevel(specialization, level.toUpperCase())
                   .stream()
                   .filter(Specialist::getAvailable)
                   .map(this::convertToDTO)
                   .collect(Collectors.toList());
    }
    
    public SpecialistDTO addSpecialist(SpecialistDTO specialistDTO) {
        Specialist specialist = convertToEntity(specialistDTO);
        specialist.setLevel(specialist.getLevel().toUpperCase());
        Specialist savedSpecialist = specialistRepository.save(specialist);
        return convertToDTO(savedSpecialist);
    }
    
    public void deleteSpecialist(Long specialistId) {
        if (!specialistRepository.existsById(specialistId)) {
            throw new RuntimeException("Specialist not found with id: " + specialistId);
        }
        specialistRepository.deleteById(specialistId);
    }
    
    public SpecialistDTO updateSpecialist(Long specialistId, SpecialistDTO specialistDTO) {
        Specialist existingSpecialist = specialistRepository.findById(specialistId)
                                            .orElseThrow(() -> new RuntimeException("Specialist not found with id: " + specialistId));
        
        existingSpecialist.setName(specialistDTO.getName());
        existingSpecialist.setSpecialization(specialistDTO.getSpecialization());
        existingSpecialist.setLevel(specialistDTO.getLevel().toUpperCase());
        existingSpecialist.setQualification(specialistDTO.getQualification());
        existingSpecialist.setExperience(specialistDTO.getExperience());
        existingSpecialist.setContactNumber(specialistDTO.getContactNumber());
        existingSpecialist.setEmail(specialistDTO.getEmail());
        existingSpecialist.setAvailable(specialistDTO.getAvailable());
        
        Specialist updatedSpecialist = specialistRepository.save(existingSpecialist);
        return convertToDTO(updatedSpecialist);
    }
    
    private SpecialistDTO convertToDTO(Specialist specialist) {
        return new SpecialistDTO(
            specialist.getId(),
            specialist.getName(),
            specialist.getSpecialization(),
            specialist.getLevel(),
            specialist.getQualification(),
            specialist.getExperience(),
            specialist.getContactNumber(),
            specialist.getEmail(),
            specialist.getAvailable()
        );
    }
    
    private Specialist convertToEntity(SpecialistDTO dto) {
        return new Specialist(
            dto.getName(),
            dto.getSpecialization(),
            dto.getLevel(),
            dto.getQualification(),
            dto.getExperience(),
            dto.getContactNumber(),
            dto.getEmail()
        );
    }
}